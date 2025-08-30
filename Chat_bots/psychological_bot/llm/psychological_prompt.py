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

def psychological_prompt(input_value=None):
  TWEAKS = {
    "TextInput-jK7mm": {
   "input_value": input_value
    },
    "GroqModel-TgwkE": {
      "groq_api_base": "https://api.groq.com",
        "groq_api_key": os.getenv("GROQ_API_KEY"),
        "model_name": "llama-3.1-8b-instant",
        "temperature": 0.2
    },
  }
  json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
  json_file = os.path.join(json_dir, "PSYCHOLOGICAL PROMPT.json")

  result = run_flow_from_json(flow=json_file,
                            input_value='message',
                            session_id=session_id, # provide a session id if you want to use session state
                            fallback_to_env_vars=True, # False by default
                            tweaks=TWEAKS)
  prompt = result[0].outputs[0].results['text']
  prompt = prompt.text

  return prompt

if __name__ == "__main__":

  summary = '''
  Summary:

  You initially expressed interest in learning data entry and I provided you with three options to consider:

  1. **Manual Data Entry**: Focus on learning the basics of data entry, including typing speed, accuracy, and attention to detail. You can practice with online tools and software like Google Forms or Microsoft Excel.
  2. **Automated Data Entry**: Explore using software like Zapier, Automate.io, or Microsoft Power Automate to automate data entry tasks. This option requires some technical knowledge but can save time and increase efficiency.
  3. **Data Entry Specialization**: Consider specializing in a specific industry, such as medical records, customer service, or financial data entry. This can help you develop expertise and increase job prospects.

  Later, you decided to combine AI with data entry and I recommended the following options:

  1. **Automated Data Entry with AI**: Explore using AI-powered tools like Google Cloud's AutoML, Microsoft Power Automate with AI Builder, or Automation Anywhere with AI capabilities. These tools can help automate data entry tasks, reduce errors, and increase efficiency.
  2. **Data Entry with Machine Learning**: Focus on learning machine learning concepts and techniques to develop custom data entry solutions. You can use libraries like scikit-learn, TensorFlow, or PyTorch to build models that can extract data from various sources and perform data entry tasks.
  3. **Natural Language Processing (NLP) for Data Entry**: Learn NLP techniques to develop AI-powered data entry solutions that can extract data from unstructured sources like text documents, emails, or chat logs. You can use libraries like spaCy, NLTK, or Stanford CoreNLP to build NLP models.

  Based on your interest in AI with data entry, I recommend exploring the AI-powered data entry options. These can help you automate data entry tasks, reduce errors, and increase efficiency. If you have any questions or need more information, feel free to ask.
  '''

  print(psychological_prompt(input_value=summary))