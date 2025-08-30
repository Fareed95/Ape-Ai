import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import json
import os
from flask import Flask, request, jsonify
from concurrent.futures import ThreadPoolExecutor
from llm.roadmap import roadmap  # Assuming synchronous function
from llm.search_query import search_query  # Assuming synchronous function
from llm.youtube_filteration import youtube_filteration_best  # Assuming synchronous function
from scrapping.youtube_scrapping import youtube_search  # Assuming synchronous function
from scrapping.pdf_scrapping import search_and_download_pdf  # PDF scraping module
from extraction.skill_extractor import extraction
from llm.test_series import test_series
from llm.ai_mentor import Ai_mentor
import psycopg2
from dotenv import load_dotenv
from llm.is_code import is_code
from test_case.test_case import run_test_cases
from llm.is_response import is_response

# Load environment variables
load_dotenv()

'''
Data base configuration 
'''

UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True) 
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")



def get_db_connection():
    return psycopg2.connect(
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        dbname=DBNAME
    )

def create_roadmap_table():
    try:
        print("ayaa hu yaha tak")
        conn = get_db_connection()
        cursor = conn.cursor()
        print("let see cursor", cursor)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS roadmap (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,  -- New field for roadmap name
                roadmap_json TEXT NOT NULL,
                roadmap_first_component TEXT NOT NULL,
                 is_completed INT DEFAULT 0,
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES api_user(id)
            );
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("Roadmap table created successfully (if not exists).")
    except Exception as e:
        print(f"Error creating roadmap table: {e}")


'''
Flask app setup 
'''
app = Flask(__name__)
# Create roadmap table at app startup
with app.app_context():
    create_roadmap_table()
executor = ThreadPoolExecutor(max_workers=5)

# Define allowed origins for CORS
from flask_cors import CORS
CORS(app, origins=[
    "https://marketlenss.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://ape.crodlin.in",
], supports_credentials=True)

'''
API BUILDING
'''
@app.route("/generate-roadmap-all", methods=["POST"])
def generate_roadmap_all():
    """
    Generate a full roadmap using the existing roadmap data stored in the roadmap_first_component column.
    """
    try:
        print("starting up with this full generator ")
        data = request.get_json()
        roadmap_id = data.get('id')  # ID of the roadmap to update

        if not roadmap_id:
            return jsonify({"error": "roadmap_id is required"}), 400

        # Fetch the existing roadmap data from the database
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Fetch the roadmap_first_component and roadmap_name for the given roadmap_id
            # Fetch the roadmap_first_component and roadmap_name for the given roadmap_id
            cursor.execute(
                "SELECT roadmap_first_component, name FROM roadmap WHERE id = %s;",
                (roadmap_id,)
            )
            roadmap_data = cursor.fetchone()

            if not roadmap_data:
                return jsonify({"error": "Roadmap not found"}), 404

            roadmap_first_component_str, roadmap_name = roadmap_data  # Unpack tuple
            roadmap_first_component = json.loads(roadmap_first_component_str)  # Convert string to JSON

            # Extract the main topic name from the roadmap_first_component
            extractor = roadmap_first_component.get("roadmap_name", "")
            print(extractor)

            # Generate the full roadmap using the existing roadmap_first_component
            result_json = roadmap_first_component.get("roadmap", [])
            print(result_json)  # Use the existing roadmap data
            length_json = len(result_json)

            # Process each component to fetch YouTube videos
            for i in range(length_json):
                # Get YouTube search query for the component
                query = search_query(input_value=result_json[i]['name'])
                search_results = executor.submit(youtube_search, query)
                search_results = search_results.result()

                # Get the list of video URLs for the component
                best_videos = youtube_filteration_best(main_topic=extractor, sub_topic=result_json[i]['name'], json_field=search_results)

                # Add videos to the component
                result_json[i]['videos'] = best_videos if best_videos else []

            # Fetch PDFs for the overall roadmap topic
            pdf_result = executor.submit(search_and_download_pdf, roadmap_name)
            pdf_result = pdf_result.result()
            if "error" in pdf_result:
                pdf_links = []
            else:
                pdf_links = pdf_result["links"]

            # Prepare the final response
            final_response = {
                "roadmap_name": extractor,
                "roadmap_components": result_json,
                "pdf_links": pdf_links,
                "total_components": length_json
            }

            # Convert final response to string for storage
            roadmap_json_str = json.dumps(final_response)

            # Update the roadmap_json column in the database
            cursor.execute(
                "UPDATE roadmap SET roadmap_json = %s WHERE id = %s RETURNING id;",
                (roadmap_json_str, roadmap_id))
            updated_roadmap_id = cursor.fetchone()
            roadmap_id = updated_roadmap_id[0]

            conn.commit()
            cursor.close()
            conn.close()

            final_response["roadmap_id"] = roadmap_id

        except Exception as db_error:
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

        # Return the final response
        return jsonify(final_response), 200

    except KeyError:
        return jsonify({"error": "Error parsing roadmap data."}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    

@app.route("/generate-roadmap-first-component", methods=["POST"])
def generate_roadmap_first_component():
    """
    Generate only the first component of the roadmap, fetch its YouTube videos,
    and save the first component's data in the database.
    """
    try:
        data = request.get_json()
        input_value = data.get('input_value')
        email = data.get('email')

        if not input_value or not email:
            return jsonify({"error": "input_value and email are required"}), 400

        # Extract the main topic name
        extractor = extraction(input_value)

        # Generate the roadmap (only the first component)
        result = roadmap(input_value=input_value)
        # print(result)
        result_json = json.loads(result)
        print(result_json)
        lenght = len(result_json)
        first_name = result_json[0]['name']
        description = result_json[0]['description']
        document = result_json[0]['document']
        test_series = result_json[0]['test_series']
        
            
        # Debugging: Print the roadmap_result to check its format
        print("Roadmap Result:", first_name)

        # Get YouTube search query for the first component
        query = search_query(input_value=str(first_name))
        search_results = executor.submit(youtube_search, query)
        search_results = search_results.result()

        # Get the list of video URLs for the first component
        best_videos = youtube_filteration_best(main_topic=extractor, sub_topic=first_name, json_field=search_results)

        # Prepare the response for the first component
        first_component_response = {
            "total_components": lenght,
            "roadmap_name": extractor,
            "roadmap": result_json,
            "first_component": {
                "name": str(first_name),
                "description": str(description),
                "document": str(document),
                "videos": best_videos if best_videos else [],
                "test_series": test_series
            }
        }

        # Save the first component's data in the database
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Get user ID from email
            cursor.execute("SELECT id FROM api_user WHERE email = %s;", (email,))
            user_id = cursor.fetchone()
            if not user_id:
                return jsonify({"error": "User not found"}), 404

            # Insert the first component's data into the database
            cursor.execute(
                "INSERT INTO roadmap (name, roadmap_json, roadmap_first_component, user_id) VALUES (%s, %s, %s, %s) RETURNING id;",
                (extractor, json.dumps({}), json.dumps(first_component_response), user_id[0])
            )
            roadmap_id = cursor.fetchone()[0]  # Fetch the ID of the newly created roadmap
            conn.commit()
            cursor.close()
            conn.close()

            first_component_response["roadmap_id"] = roadmap_id

        except Exception as db_error:
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

        # Return the first component's data
        return jsonify(first_component_response), 200

    except KeyError as e:
        data = request.get_json()
        print("\n\n\n\n\n\n\n\n Idhar hai ham\n\n\n\n\n\n\n")
        input_value = data.get('input_value')
        email = data.get('email')

        if not input_value or not email:
            return jsonify({"error": "input_value and email are required"}), 400

        # Extract the main topic name
        extractor = extraction(input_value)

        # Generate the roadmap (only the first component)
        result = roadmap(input_value=input_value)
        # print(result)
        result_json = json.loads(result)
        print(result_json)
        lenght = len(result_json['blocks'])
        print(lenght)
        first_name = result_json['blocks'][0]['name']
        description = result_json['blocks'][0]['description']
        document = result_json['blocks'][0]['document']
        test_series = result_json['blocks'][0]['test_series']
        print(first_name,description,document, test_series)
            
        # Debugging: Print the roadmap_result to check its format
        print("Roadmap Result:", first_name)

        # Get YouTube search query for the first component
        query = search_query(input_value=str(first_name))
        search_results = executor.submit(youtube_search, query)
        search_results = search_results.result()

        # Get the list of video URLs for the first component
        best_videos = youtube_filteration_best(main_topic=extractor, sub_topic=first_name, json_field=search_results)

        # Prepare the response for the first component
        first_component_response = {
            "total_components": lenght,
            "roadmap_name": extractor,
            "roadmap": result_json['blocks'],
            "first_component": {
                "name": str(first_name),
                "description": str(description),
                "document": str(document),
                "videos": best_videos if best_videos else [],
                "test_series": test_series
            }
        }

        # Save the first component's data in the database
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Get user ID from email
            cursor.execute("SELECT id FROM api_user WHERE email = %s;", (email,))
            user_id = cursor.fetchone()
            if not user_id:
                return jsonify({"error": "User not found"}), 404

            # Insert the first component's data into the database
            cursor.execute(
                "INSERT INTO roadmap (name, roadmap_json, roadmap_first_component, user_id) VALUES (%s, %s, %s, %s) RETURNING id;",
                (extractor, json.dumps({}), json.dumps(first_component_response), user_id[0])
            )
            roadmap_id = cursor.fetchone()[0]  # Fetch the ID of the newly created roadmap
            conn.commit()
            cursor.close()
            conn.close()

            first_component_response["roadmap_id"] = roadmap_id

        except Exception as db_error:
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

        # Return the first component's data
        return jsonify(first_component_response), 200
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
@app.route("/user-roadmaps", methods=["POST"])
def get_user_roadmaps():
    """
    Fetch all roadmaps for a specific user by email.
    """
    try:
        # Get email from request body
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({"error": "email is required"}), 400

        # Fetch roadmaps from the database
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Get user ID from email
            cursor.execute("SELECT id FROM api_user WHERE email = %s;", (email,))
            user_id = cursor.fetchone()
            if not user_id:
                return jsonify({"error": "User not found"}), 404

            # Fetch all roadmaps for the user
            cursor.execute(
                "SELECT id, name, roadmap_json FROM roadmap WHERE user_id = %s;",
                (user_id[0],)
            )
            roadmaps = cursor.fetchall()
            cursor.close()
            conn.close()

            # Convert roadmap_json from string to JSON and prepare response
            roadmap_list = []
            for roadmap in roadmaps:
                roadmap_id, name, roadmap_json_str = roadmap
                roadmap_json = json.loads(roadmap_json_str)  # Convert string to JSON
                roadmap_list.append({
                    "id": roadmap_id,
                    "name": name,
                    "roadmap_json": roadmap_json
                })

            return jsonify(roadmap_list), 200

        except Exception as db_error:
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500




@app.route("/roadmaps/<int:roadmap_id>/complete", methods=["PATCH"])
def update_roadmap_completion(roadmap_id):
    """
    Update the is_completed field for a specific roadmap.
    """
    try:
        # Get data from request body
        data = request.get_json()
        is_completed = data.get('is_completed')
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Check if the roadmap exists
            cursor.execute("SELECT id FROM roadmap WHERE id = %s;", (roadmap_id,))
            if not cursor.fetchone():
                return jsonify({"error": "Roadmap not found"}), 404

            # Update the is_completed field
            cursor.execute(
                "UPDATE roadmap SET is_completed = %s WHERE id = %s;",
                (is_completed, roadmap_id)
            )
            conn.commit()
            cursor.close()
            conn.close()
            print("\n\n\n\the roadmap now has set to the",is_completed,"\n\n\n\n")

            return jsonify({"message": "Roadmap completion status updated successfully"}), 200

        except Exception as db_error:
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    
@app.route("/roadmaps/<int:roadmap_id>", methods=["GET"])
def get_roadmap_by_id(roadmap_id):
    """
    Fetch a specific roadmap by its ID.
    """
    try:
        # Fetch roadmap from the database
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Fetch the roadmap by ID
            cursor.execute(
                "SELECT id, name, roadmap_json, is_completed FROM roadmap WHERE id = %s;",
                (roadmap_id,)
            )
            roadmap = cursor.fetchone()
            cursor.close()
            conn.close()

            # If roadmap not found, return 404
            if not roadmap:
                return jsonify({"error": "Roadmap not found"}), 404

            # Convert roadmap_json from string to JSON and prepare response
            roadmap_id, name, roadmap_json_str,is_completed = roadmap
            roadmap_json = json.loads(roadmap_json_str)  # Convert string to JSON

            return jsonify({
                "id": roadmap_id,
                "name": name,
                "roadmap_json": roadmap_json,
                "is_completed":is_completed
            }), 200

        except Exception as db_error:
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500    
    
@app.route("/roadmaps/<int:roadmap_id>/component", methods=["POST"])
def get_roadmap_component(roadmap_id):
    """
    Fetch a specific component from a roadmap by its ID and component index.
    """
    try:
        # Get component number from request body
        data = request.get_json()
        component_number = data.get('component_number')

        if component_number is None:
            return jsonify({"error": "component_number is required"}), 400

        # Fetch roadmap from the database
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Fetch the roadmap by ID
            cursor.execute(
                "SELECT id, name, roadmap_json FROM roadmap WHERE id = %s;",
                (roadmap_id,)
            )
            roadmap = cursor.fetchone()
            cursor.close()
            conn.close()

            # If roadmap not found, return 404
            if not roadmap:
                return jsonify({"error": "Roadmap not found"}), 404

            # Convert roadmap_json from string to JSON
            roadmap_id, name, roadmap_json_str = roadmap
            roadmap_json = json.loads(roadmap_json_str)  # Convert string to JSON

            # Check if roadmap_components exists and component_number is valid
            if "roadmap_components" not in roadmap_json:
                return jsonify({"error": "No components found in the roadmap"}), 404

            if not isinstance(roadmap_json["roadmap_components"], list):
                return jsonify({"error": "Invalid roadmap components format"}), 500

            if component_number < 0 or component_number >= len(roadmap_json["roadmap_components"]):
                return jsonify({"error": "Invalid component_number"}), 400

            # Get the specific component
            component = roadmap_json["roadmap_components"][component_number]

            return jsonify({
                "id": roadmap_id,
                "name": name,
                "component": component
            }), 200

        except Exception as db_error:
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    

@app.route("/testseries", methods=["POST"])
def test_series_api():
    """
    Test series API
    """
    try:
        data = request.get_json()
        input_value = data.get('input_value')

        if not input_value:
            return jsonify({"error": "input_value is required"}), 400

        result = test_series(input_value=input_value)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    

@app.route("/ai-mentor", methods=["POST"])
def ai_mentor_api():
    """
    AI Mentor API
    """
    try:
        data = request.get_json()
        question = data.get('question')
        component = data.get('component')

        if not question or not component:
            return jsonify({"error": "question and component are required"}), 400

        result = Ai_mentor(question=question, component=component)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route("/is_code", methods=["POST"])
def is_code_api(): 
    """
    is_code API
    """
    try:
        data = request.get_json()
        code = data.get('name')
        if not code:
            return jsonify({"error": "name is required"}), 400
        is_code_api = is_code(code)
        return {'is_code':is_code_api}
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}),

@app.route("/run-tests", methods=["POST"])
def run_tests():
    data = request.json
    
    file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "test_case", "test_case.txt"))
    test_case_1 = tuple(data.get("test_case_1", []))
    test_case_2 = tuple(data.get("test_case_2", []))
    expected_output_1 = data.get("expected_output_1")
    expected_output_2 = data.get("expected_output_2")
    
    try:
        results = run_test_cases(file_path, test_case_1, test_case_2, expected_output_1, expected_output_2)
        return jsonify({"success": True, "results": results})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
    
@app.route("/is-response", methods=["POST"])
def is_response_function():
    data = request.json 
    prompt = data.get("prompt")
    # response = data.get("response")
    result = is_response(prompt)
    print(result)
    return jsonify({"response": result})
# if __name__ == '__main__':
#     create_roadmap_table()  # Ensure roadmap table is created
#     app.run(port=8001,debug=True) 