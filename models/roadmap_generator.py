# Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token

import argparse
import json
from argparse import RawTextHelpFormatter
import requests
from typing import Optional
import warnings
import os 
from dotenv import load_dotenv


load_dotenv()
try:
    from langflow.load import upload_file
except ImportError:
    warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
    upload_file = None

BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "563677ee-c1d6-43e4-8442-c4d7fde992f0"
FLOW_ID = "529e7fe9-97f4-4d33-aeee-84e55d731d4a"
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")
ENDPOINT = "" 
def roadmap_generator(input_value):
    TWEAKS = {
    "TextInput-PDOUC": {
        "input_value": input_value
    }
    }
    return run_flow("",tweaks=TWEAKS, application_token=APPLICATION_TOKEN)
    
def run_flow(message: str,
  output_type: str = "chat",
  input_type: str = "chat",
  tweaks: Optional[dict] = None,
  application_token: Optional[str] = None) -> dict:

    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/roadmap"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    headers = None
    if tweaks:
        payload["tweaks"] = tweaks
    if application_token:
        headers = {"Authorization": "Bearer " + application_token, "Content-Type": "application/json"}
    response = requests.post(api_url, json=payload, headers=headers)
    response_json = response.json()
    try:
        # This assumes the structure you showed earlier
        output_text = response_json['outputs'][0]['outputs'][0]['results']['text']['data']['text']
        return output_text
    except KeyError as e:
        return f"Error parsing response: {e}"


result = roadmap_generator("i want to learn django")
print(result)