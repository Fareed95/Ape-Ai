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
TWEAKS = {
  "TextInput-aNgsd": {
    "input_value": "{\"name\": \"Python Basics\", \"description\": \"Learn the fundamentals of Python programming, including data types, variables, control structures, functions, and modules.\", \"document\": \"https://docs.python.org/3/tutorial/index.html\", \"test_series\": [{\"question\": \"What is the output of the following Python code: print(5 + 3)?\", \"options\": [\"8\", \"10\", \"12\", \"15\"], \"answer\": \"8\"}, {\"question\": \"What is the difference between '==' and 'is' in Python?\", \"options\": [\"'==' checks for equality, while 'is' checks for identity.\", \"'==' checks for identity, while 'is' checks for equality.\", \"'==' checks for both equality and identity.\", \"'==' and 'is' are the same.\"], \"answer\": \"0\"}, {\"question\": \"What is the purpose of the 'pass' statement in Python?\", \"options\": [\"To skip a block of code.\", \"To continue to the next iteration of a loop.\", \"To exit a loop.\", \"To do nothing and continue execution.\"], \"answer\": \"3\"}], \"videos\": [\"https://www.youtube.com/embed/kqtD5dpn9C8\", \"https://www.youtube.com/embed/fr1f84rg4Nw\", \"https://www.youtube.com/embed/vLqTf2b6GZw\", \"https://www.youtube.com/embed/fWjsdhR3z3c\", \"https://www.youtube.com/embed/DInMru2Eq6E\"]}"
  },
  "GroqModel-McjuE": {
    "groq_api_base": "https://api.groq.com",
    "groq_api_key": "",
    "input_value": "",
    "max_tokens": None,
    "model_name": "llama-3.1-8b-instant",
    "n": None,
    "stream": False,
    "system_message": "",
    "temperature": 0.1
  },
  "Prompt-jdNAu": {
    "template": "You are an helpful ai mentor you need to solve the users doubt by the learning components json's provided \nEnsure that :\n1.. Do not get out of the topic.\n2. Use chat history for users previous communications\nYour given learning component is {input}\nand your question is {question}\nchat history - {chathistory}\nFocus on relevance and accuracy",
    "input": "",
    "question": "",
    "chathistory": ""
  },
  "TextOutput-1Inat": {
    "input_value": ""
  },
  "TextInput-Nn8CT": {
    "input_value": ""
  },
  "TextInput-JHayw": {
    "input_value": ""
  },
  "Prompt-xq8NZ": {
    "template": "You are a helpful AI assistant. Your task is to generate a concise, coherent summary (20 to 500 words) by combining two inputs: a summary of previous chats and the latest chat. Maintain the flow of conversation and preserve all essential details.\nIf only one of the inputs is provided, generate the summary based on that input. If both inputs are missing, return None.\n\nInputs:\n\nSummary of previous chats: {previous_summary}\n\nLatest chat: {latest_chat}",
    "previous_summary": "",
    "latest_chat": ""
  },
  "GroqModel-z4kYO": {
    "groq_api_base": "https://api.groq.com",
    "groq_api_key": "",
    "input_value": "",
    "max_tokens": None,
    "model_name": "llama-3.1-8b-instant",
    "n": None,
    "stream": False,
    "system_message": "",
    "temperature": 0.1
  },
  "TextOutput-RBJE2": {
    "input_value": ""
  },
  "TextInput-iIpRY": {
    "input_value": ""
  }
}

result = run_flow_from_json(flow="ai mentor .json",
                            session_id="", # provide a session id if you want to use session state
                            fallback_to_env_vars=True, # False by default
                            tweaks=TWEAKS)