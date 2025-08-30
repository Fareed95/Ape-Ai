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



# User input

def Ai_mentor(component, question):
  TWEAKS = {
    "TextInput-nh3Np": {
      component
    },
    "GroqModel-ZgGwv": {
      "groq_api_base": "https://api.groq.com",
      "groq_api_key": os.getenv("GROQ_API_KEY"),
      "model_name": "llama-3.1-8b-instant",
      "temperature": 0.2
    },
    "TextInput-CwESQ": {
      "input_value": question
    }
  }

  json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
  json_file = os.path.join(json_dir, "Ai_mentor.json")

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
  component = {"name": "Python Basics", "description": "Learn the fundamentals of Python programming, including data types, variables, control structures, functions, and modules.", "document": "https://docs.python.org/3/tutorial/index.html", "test_series": [{"question": "What is the output of the following Python code: print(5 + 3)?", "options": ["8", "10", "12", "15"], "answer": "8"}, {"question": "What is the difference between '==' and 'is' in Python?", "options": ["'==' checks for equality, while 'is' checks for identity.", "'==' checks for identity, while 'is' checks for equality.", "'==' checks for both equality and identity.", "'==' and 'is' are the same."], "answer": "0"}, {"question": "What is the purpose of the 'pass' statement in Python?", "options": ["To skip a block of code.", "To continue to the next iteration of a loop.", "To exit a loop.", "To do nothing and continue execution."], "answer": "3"}], "videos": ["https://www.youtube.com/embed/kqtD5dpn9C8", "https://www.youtube.com/embed/fr1f84rg4Nw", "https://www.youtube.com/embed/vLqTf2b6GZw", "https://www.youtube.com/embed/fWjsdhR3z3c", "https://www.youtube.com/embed/DInMru2Eq6E"]}
  question = "How to get start with loops in Python?"
  result = Ai_mentor(str(component), question)
  print(result['bot_response'])  # Output: 'django'  # Output: 'django'  #