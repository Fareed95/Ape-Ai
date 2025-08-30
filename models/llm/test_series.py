from langflow.load import run_flow_from_json
import os
import json
import logging
import sys
from dotenv import load_dotenv
import uuid
import warnings

load_dotenv()
session_id = str(uuid.uuid4())

warnings.filterwarnings("ignore")
logging.getLogger("langchain").setLevel(logging.ERROR)

def test_series(input_value):
    TWEAKS = {
        "TextInput-BqVrB": {
            "input_value": input_value
        },
        "GroqModel-VG2Vg": {
            "groq_api_base": "https://api.groq.com",
            "groq_api_key": os.getenv("GROQ_API_KEY")   
        }
    }
    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
    json_file = os.path.join(json_dir, "Test series.json")
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
    input_value = "Excel"
    result = test_series(input_value=input_value)
    print(result)  # Output: 'django'  # Output: 'django'  #