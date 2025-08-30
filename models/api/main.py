import os
import json
import asyncio
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
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
from pydantic import BaseModel

# Load environment variables
load_dotenv()

# Database configuration
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

print("Database Config:")
print("USER:", USER)
print("PASSWORD:", PASSWORD)
print("HOST:", HOST)
print("PORT:", PORT)
print("DBNAME:", DBNAME)

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
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS roadmap (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
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

# FastAPI app setup
app = FastAPI()

# Define allowed origins for CORS
origins = [
    "https://marketlenss.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

executor = ThreadPoolExecutor(max_workers=5)

# Pydantic models for request bodies
class GenerateRoadmapAllRequest(BaseModel):
    id: int

class GenerateRoadmapFirstComponentRequest(BaseModel):
    input_value: str
    email: str

class UserRoadmapsRequest(BaseModel):
    email: str

class UpdateRoadmapCompletionRequest(BaseModel):
    is_completed: int

class GetRoadmapComponentRequest(BaseModel):
    component_number: int

class TestSeriesRequest(BaseModel):
    input_value: str

class AiMentorRequest(BaseModel):
    question: str
    component: str

# API Endpoints
@app.post("/generate-roadmap-all")
async def generate_roadmap_all(request: GenerateRoadmapAllRequest):
    """
    Generate a full roadmap using the existing roadmap data stored in the roadmap_first_component column.
    """
    try:
        roadmap_id = request.id

        if not roadmap_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="roadmap_id is required")

        # Fetch the existing roadmap data from the database
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Fetch the roadmap_first_component and roadmap_name for the given roadmap_id
            cursor.execute(
                "SELECT roadmap_first_component, name FROM roadmap WHERE id = %s;",
                (roadmap_id,)
            )
            roadmap_data = cursor.fetchone()

            if not roadmap_data:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Roadmap not found")

            roadmap_first_component_str, roadmap_name = roadmap_data  # Unpack tuple
            roadmap_first_component = json.loads(roadmap_first_component_str)  # Convert string to JSON

            # Extract the main topic name from the roadmap_first_component
            extractor = roadmap_first_component.get("roadmap_name", "")
            print(extractor)

            # Generate the full roadmap using the existing roadmap_first_component
            result_json = roadmap_first_component.get("roadmap", [])
            length_json = len(result_json)

            # Process each component to fetch YouTube videos
            for i in range(length_json):
                # Get YouTube search query for the component
                query = search_query(input_value=result_json[i]['name'])
                search_results = await asyncio.get_event_loop().run_in_executor(executor, youtube_search, query)

                # Get the list of video URLs for the component
                best_videos = youtube_filteration_best(main_topic=extractor, sub_topic=result_json[i]['name'], json_field=search_results)

                # Add videos to the component
                result_json[i]['videos'] = best_videos if best_videos else []

            # Fetch PDFs for the overall roadmap topic
            pdf_result = await asyncio.get_event_loop().run_in_executor(executor, search_and_download_pdf, roadmap_name)
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
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error: {str(db_error)}")

        # Return the final response
        return final_response

    except KeyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error parsing roadmap data.")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"An unexpected error occurred: {str(e)}")

@app.post("/generate-roadmap-first-component")
async def generate_roadmap_first_component(request: GenerateRoadmapFirstComponentRequest):
    """
    Generate only the first component of the roadmap, fetch its YouTube videos,
    and save the first component's data in the database.
    """
    try:
        input_value = request.input_value
        email = request.email

        if not input_value or not email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="input_value and email are required")

        # Extract the main topic name
        extractor = extraction(input_value)

        # Generate the roadmap (only the first component)
        result = roadmap(input_value=input_value)
        result_json = json.loads(result)
        print(result_json)
        length = len(result_json)
        first_name = result_json[0]['name']
        description = result_json[0]['description']
        document = result_json[0]['document']
        test_series_data = result_json[0]['test_series']

        # Debugging: Print the roadmap_result to check its format
        print("Roadmap Result:", first_name)

        # Get YouTube search query for the first component
        query = search_query(input_value=str(first_name))
        search_results = await asyncio.get_event_loop().run_in_executor(executor, youtube_search, query)

        # Get the list of video URLs for the first component
        best_videos = youtube_filteration_best(main_topic=extractor, sub_topic=first_name, json_field=search_results)

        # Prepare the response for the first component
        first_component_response = {
            "total_components": length,
            "roadmap_name": extractor,
            "roadmap": result_json,
            "first_component": {
                "name": str(first_name),
                "description": str(description),
                "document": str(document),
                "videos": best_videos if best_videos else [],
                "test_series": test_series_data
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
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

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
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error: {str(db_error)}")

        # Return the first component's data
        return first_component_response

    except KeyError as e:
        input_value = request.input_value
        email = request.email

        if not input_value or not email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="input_value and email are required")

        # Extract the main topic name
        extractor = extraction(input_value)

        # Generate the roadmap (only the first component)
        result = roadmap(input_value=input_value)
        result_json = json.loads(result)
        print(result_json)
        length = len(result_json['blocks'])
        print(length)
        first_name = result_json['blocks'][0]['name']
        description = result_json['blocks'][0]['description']
        document = result_json['blocks'][0]['document']
        test_series_data = result_json['blocks'][0]['test_series']
        print(first_name, description, document, test_series_data)

        # Debugging: Print the roadmap_result to check its format
        print("Roadmap Result:", first_name)

        # Get YouTube search query for the first component
        query = search_query(input_value=str(first_name))
        search_results = await asyncio.get_event_loop().run_in_executor(executor, youtube_search, query)

        # Get the list of video URLs for the first component
        best_videos = youtube_filteration_best(main_topic=extractor, sub_topic=first_name, json_field=search_results)

        # Prepare the response for the first component
        first_component_response = {
            "total_components": length,
            "roadmap_name": extractor,
            "roadmap": result_json,
            "first_component": {
                "name": str(first_name),
                "description": str(description),
                "document": str(document),
                "videos": best_videos if best_videos else [],
                "test_series": test_series_data
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
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

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
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error: {str(db_error)}")

        # Return the first component's data
        return first_component_response
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"An unexpected error occurred: {str(e)}")

# Add other endpoints as needed...

# Run FastAPI app
if __name__ == '__main__':
    create_roadmap_table()  # Ensure roadmap table is created
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)