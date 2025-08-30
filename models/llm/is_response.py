from langflow.load import run_flow_from_json
import warnings
import logging
import json
import uuid
import os 
from dotenv import load_dotenv

load_dotenv()
# Generate a unique session ID
session_id = str(uuid.uuid4())

# Suppress warnings and logs
warnings.filterwarnings("ignore")
logging.getLogger("langchain").setLevel(logging.ERROR)

def is_response(prompt):
    TWEAKS = {
        "TextInput-cOoMQ": {
            "input_value": prompt
        },
        "GroqModel-Aepge": {
            "groq_api_base": "https://api.groq.com",
            "groq_api_key": os.getenv("GROQ_API_KEY"),
            "model_name": "llama-3.1-8b-instant",
            "temperature": 0.3
        },
    }
    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
    json_file = os.path.join(json_dir, "is_response.json")

    try:
        result = run_flow_from_json(
            flow=json_file,
            input_value="message",
            session_id=session_id,
            fallback_to_env_vars=True,
            tweaks=TWEAKS
        )
        
        raw_message = result[0].outputs[0].results['text'].text
        raw_message = raw_message.lower()
        
        return raw_message
    except Exception as e:
        return str(e)
if __name__ == "__main__":
    # Test the function
    prompt = "I wamt to learn cooking allo da paratha"
    print(is_response(prompt))  # Output: True