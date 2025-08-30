from langflow.load import run_flow_from_json
import os 
from dotenv import load_dotenv
import warnings
import logging
import json
import uuid

load_dotenv()
# Generate a unique session ID
session_id = str(uuid.uuid4())

# Suppress warnings and logs
warnings.filterwarnings("ignore")
logging.getLogger("langchain").setLevel(logging.ERROR)


def youtube_filteration_best(main_topic, sub_topic, json_field):
    TWEAKS = {
    "GroqModel-F4G8v": {
        "groq_api_key": os.getenv("GROQ_API_KEY"),
        "model_name": "llama3-8b-8192",
        "temperature": 0.2
    },
    "TextInput-DdJSI": {
       "input_value":json_field
    },
    "TextInput-QPGcB": {
        "input_value":sub_topic
    },
    "TextInput-1cIAI": {
        "input_value":main_topic
    }
    }
    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
    json_file = os.path.join(json_dir, "Filteration_youtube_videos.json")

    result = run_flow_from_json(
        flow=json_file,
        input_value="message",
        session_id=session_id,  # Provide a session ID
        fallback_to_env_vars=True,  # Allows environment variable fallback
        tweaks=TWEAKS
    )
    raw_message = result[0].outputs[0].results['text']
    # Ensure the text is properly cleaned and formatted
    if isinstance(raw_message, str):
        cleaned_message = json.loads(raw_message)  # Convert JSON string to dictionary
    elif hasattr(raw_message, "text"):  # Handle object case
        cleaned_message = json.loads(raw_message.text)
    else:
        raise ValueError("Unexpected response format from LangFlow.")

    # Return only the search query
    return cleaned_message.get("best_videos", "No search query found")



if __name__ == "__main__":
    import sys
    import os

    # Get the parent directory (models/) and add it to sys.path
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

    # Now import the module
    from scrapping.youtube_scrapping import youtube_search


    main_topic = "Python"
    sub_topic = "Python Basics"
    json_field = youtube_search(sub_topic)
    # print(json_field)
    # json_field = "{'name': 'Python'}"
    print(youtube_filteration_best(main_topic=main_topic,sub_topic= sub_topic,json_field= json_field))  # prints: