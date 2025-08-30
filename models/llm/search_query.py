from langflow.load import run_flow_from_json
import os 
from dotenv import load_dotenv
import warnings
import logging
import json
import uuid

load_dotenv()
session_id = str(uuid.uuid4())

warnings.filterwarnings("ignore")
logging.getLogger("langchain").setLevel(logging.ERROR)


def search_query(input_value):
    TWEAKS = {
     "TextInput-nylvA": {
    "input_value": input_value
  },

    "GroqModel-Poyuw": {
        "groq_api_base": "https://api.groq.com",
        "groq_api_key": os.getenv("GROQ_API_KEY")   
    },
    }
    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "json"))
    json_file = os.path.join(json_dir, "Youtube_search_query.json")
    result = run_flow_from_json(
            flow=json_file,
            input_value="message",
            session_id=session_id,  
            fallback_to_env_vars=True, 
            tweaks=TWEAKS
        )
    raw_message = result[0].outputs[0].results['text']

    if isinstance(raw_message, str):
        cleaned_message = json.loads(raw_message)  
    elif hasattr(raw_message, "text"):  
        cleaned_message = json.loads(raw_message.text)
    else:
        raise ValueError("Unexpected response format from LangFlow.")

    return cleaned_message.get("search_query", "No search query found")

    

if __name__ == "__main__":
    import sys
    import os

    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

    from scrapping.youtube_scrapping import youtube_search
    from llm.youtube_filteration import youtube_filteration_best
    main_topic = "drafting in laws"
    sub_topic = "legal terminology"
    search =search_query(input_value=sub_topic)
    # search = "legal terminology explained in simple terms video"
    print(search)
    result = youtube_search(str(search), max_results=10)
    print(result)
    filter = youtube_filteration_best(main_topic=main_topic,sub_topic=sub_topic, json_field=result)
    print(filter)   
    print(type(filter))