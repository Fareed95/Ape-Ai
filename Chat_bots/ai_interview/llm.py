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
warnings.filterwarnings("ignore")
logging.getLogger("langchain").setLevel(logging.ERROR)

def Ai_interview(company_data,internship_data,chat_history,number_of_question_asked):
    TWEAKS = {
    "TextInput-KylOT": {
        "input_value": company_data
    },
    "TextInput-7v58P": {
        "input_value": internship_data
    },
    "GroqModel-HiI7w": {
        "groq_api_base": "https://api.groq.com",
      "groq_api_key": os.getenv("GROQ_API_KEY"),
      "model_name": "llama-3.1-8b-instant",
      "temperature": 0.2
    },
    "TextInput-q8AsR": {
        "input_value": chat_history
    },
    "GroqModel-VMD5x": {
        "groq_api_base": "https://api.groq.com",
      "groq_api_key": os.getenv("GROQ_API_KEY"),
      "model_name": "llama-3.1-8b-instant",
      "temperature": 0.2
    },
    "GroqModel-LFOyH": {
       "groq_api_base": "https://api.groq.com",
      "groq_api_key": os.getenv("GROQ_API_KEY"),
      "model_name": "llama-3.1-8b-instant",
      "temperature": 0.2
    },
    "TextInput-kocAe": {
        "input_value": number_of_question_asked
    }
    }

    # print(comopany_data,internship_data,chat_history,number_of_question_asked)
    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".", "json"))
    json_file = os.path.join(json_dir, "Ai interviewer.json")

    result = run_flow_from_json(flow=json_file,
                                input_value = "message",
                                session_id=session_id, # provide a session id if you want to use session state
                                fallback_to_env_vars=True, # False by default
                                tweaks=TWEAKS)
     
    raw_message = result[0].outputs[2].results['text']
    raw_message = raw_message.text
    json_message = json.loads(raw_message)
    # print(type(json_message))
    return json_message['new_question']

if __name__ == "__main__":
    comopany_data = "Company Name: TechNova Solutions Industry: Software Development Location: Bangalore, India Website: www.technova.com Description: TechNova Solutions is a leading software development company specializing in innovative tech solutions for businesses worldwide. Contact Email: hr@technova.com Phone: +91 9876543210"
    internship_data = "Internship Title: Software Development Internship Duration: 3 months Start Date: June 1, 2022 Location: Bangalore, India Stipend: INR 15,000 per month Description: TechNova Solutions is offering a 3-month software development internship for students interested in gaining hands-on experience in the tech industry. The internship will cover a range of topics, including web development, mobile app development, and software testing. Apply now to kickstart your career in tech!"
    chat_history = {
    "question": "Welcome to TechNova Solutions, a leading software development company in Bangalore. We are excited to have you on board for our 6-month remote internship in software development. Can you tell us a little about yourself and why you're interested in this internship?",
    "answer": "Thank you for this opportunity! My name is Rahul Sharma, and I am currently pursuing a B.Tech in Computer Science. I have a strong interest in software development and enjoy working with technologies like React, Django, and Python. I am particularly excited about this internship because TechNova Solutions is known for its innovative projects and collaborative environment. I am eager to contribute to real-world projects, learn from experienced professionals, and enhance my skills. I believe this experience will be a great step forward in my career journey."
    },
    {
    "question": "What do you think are your greatest strengths and weaknesses, and how do you think they will impact your performance in this internship?",
    "answer": "One of my greatest strengths is my adaptability. I am quick to learn and adjust to new technologies and environments, which I believe will help me contribute effectively during this internship. Additionally, I am a good problem solver and enjoy tackling challenges with a logical and analytical approach. As for my weakness, I sometimes tend to focus too much on perfection, which can affect my speed. However, I am actively working on finding a balance between efficiency and quality. I am confident that my proactive attitude and willingness to learn will help me make a positive impact at TechNova Solutions."
    }


    chat_history = json.dumps(chat_history)

    # print(type(chat_history))
    # print(chat_history)






    number_of_question_asked = "2"
    result = Ai_interview(comopany_data=comopany_data,
                          internship_data=internship_data,
                          chat_history=chat_history,
                          number_of_question_asked=number_of_question_asked
                          )
    print(result)
