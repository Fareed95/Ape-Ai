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


def psycholgy_chat_bot( user_input=None, summary_of_previous_chats=None, latest_chat=None):
    TWEAKS = {
  "GroqModel-S8fmA": {
    "groq_api_base": "https://api.groq.com",
      "groq_api_key": os.getenv("GROQ_API_KEY"),
      "model_name": "llama-3.1-8b-instant",
      "temperature": 0.2
  },
  "TextInput-QlGHv": {
    "input_value": summary_of_previous_chats
  },
  "GroqModel-9euHC": {
    "groq_api_base": "https://api.groq.com",
      "groq_api_key": os.getenv("GROQ_API_KEY"),
      "model_name": "llama-3.1-8b-instant",
      "temperature": 0.2
  },
  "TextInput-0L7Dp": {
    "input_value": user_input
  },
  "TextInput-PqO1b": {
    "input_value": latest_chat
  }
}
    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
    json_file = os.path.join(json_dir, "Memory Chatbot.json")


    result = run_flow_from_json(flow=json_file,
                            input_value='message',
                            session_id=session_id, # provide a session id if you want to use session state
                            fallback_to_env_vars=True, # False by default
                            tweaks=TWEAKS)
    chat_bot_response = result[0].outputs[0].results['text']
    print(chat_bot_response)
    chat_bot_response = chat_bot_response.text
    print(chat_bot_response)

    summary = result[0].outputs[1].results['text']
    summary = summary.text
    return chat_bot_response, summary

if __name__=='__main__':
    # chat_history = "I am feeling sad"
    user_input = "I dont want to go in this coding and all part"
    # print(psycholgy_chat_bot( user_input=user_input))

    latest_chat = '''
    user - So I want to go with ai with data entry so what should I chose ?
    bot - you're interested in combining AI with data entry. That's a great approach. Based on your interest, I'd recommend the following options:

1. **Automated Data Entry with AI**: Explore using AI-powered tools like Google Cloud's AutoML, Microsoft Power Automate with AI Builder, or Automation Anywhere with AI capabilities. These tools can help automate data entry tasks, reduce errors, and increase efficiency.
2. **Data Entry with Machine Learning**: Focus on learning machine learning concepts and techniques to develop custom data entry solutions. You can use libraries like scikit-learn, TensorFlow, or PyTorch to build models that can extract data from various sources and perform data entry tasks.
3. **Natural Language Processing (NLP) for Data Entry**: Learn NLP techniques to develop AI-powered data entry solutions that can extract data from unstructured sources like text documents, emails, or chat logs. You can use libraries like spaCy, NLTK, or Stanford CoreNLP to build NLP models.

Which option resonates with you the most?


    '''

    summary_of_previous_chats = '''' 
    You expressed interest in learning data entry, and I provided you with three options to consider:

    1. **Manual Data Entry**: Focus on learning the basics of data entry, including typing speed, accuracy, and attention to detail. You can practice with online tools and software like Google Forms or Microsoft Excel.
    2. **Automated Data Entry**: Explore using software like Zapier, Automate.io, or Microsoft Power Automate to automate data entry tasks. This option requires some technical knowledge but can save time and increase efficiency.
    3. **Data Entry Specialization**: Consider specializing in a specific industry, such as medical records, customer service, or financial data entry. This can help you develop expertise and increase job prospects.

    To further your learning, you can choose the option that best suits your interests and goals. If you have any questions or need more information, feel free to ask.

    '''
    print(os.getenv("GROQ_API_KEY"))
    chat_bot_response, summary = psycholgy_chat_bot( user_input=user_input, latest_chat=latest_chat, summary_of_previous_chats=summary_of_previous_chats)
    print(f'chatbot response - {chat_bot_response}')  # prints the response of the chatbot
    print(f' summary - {summary}')  # prints the summary of the chat