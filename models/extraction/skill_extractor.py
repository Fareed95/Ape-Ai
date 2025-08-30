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

def extraction(input_value):
    TWEAKS = {
        "TextInput-AFCNE": {
            "input_value": input_value
        },
        "GroqModel-Juqd6": {
            "groq_api_base": "https://api.groq.com",
            "groq_api_key": os.getenv("GROQ_API_KEY"),
            "model_name": "llama-3.1-8b-instant",
            "temperature": 0.2
        }
    }

    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
    json_file = os.path.join(json_dir, "Skill_extractor_from_sentences.json")

    result = run_flow_from_json(
        flow=json_file,
        input_value="message",
        session_id=session_id,
        fallback_to_env_vars=True,
        tweaks=TWEAKS
    )
    
    # Directly extract the text value from the result without the extra JSON
    raw_message = result[0].outputs[0].results["text"]
    if isinstance(raw_message, str):
        cleaned_message = json.dumps(json.loads(raw_message), indent=4)
        return cleaned_message
    else:
        cleaned_message = json.dumps(json.loads(raw_message.text), indent=4)
        result_json = json.loads(cleaned_message)
        return result_json['skill']


if __name__ == "__main__":
    input_value = "I am thinking to go with drafting in law"
    result = extraction(input_value)
    print(result)  # This will print only "Drafting"
