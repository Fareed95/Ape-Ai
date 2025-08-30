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



def coding_tasks(input_value):
    TWEAKS = {
    "TextInput-7zlta": {
        "input_value": input_value
    },
    "GroqModel-TTgeP": {
      "groq_api_base": "https://api.groq.com",
      "groq_api_key": os.getenv("GROQ_API_KEY"),
      "model_name": "llama-3.1-8b-instant",
      "temperature": 0.2
    },
    }

    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
    json_file = os.path.join(json_dir, "Test series for coding type questions.json")

    result = run_flow_from_json(flow=json_file,
                                input_value="message",
                                session_id=session_id, # provide a session id if you want to use session state
                                fallback_to_env_vars=True, # False by default
                                tweaks=TWEAKS)
    
    raw_message = result[0].outputs[0].results['text']
    raw_message = raw_message.text
    json_message = json.loads(raw_message)
    # print(type(json_message))
    return json_message 


if __name__ == "__main__":
    input_value = "Java Script"
    print(coding_tasks(input_value))