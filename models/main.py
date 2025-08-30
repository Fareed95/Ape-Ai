from models.llm.roadmap import roadmap
import json
from models.scrapping.youtube_scrapping import youtube_search

def parsing():
    try : 
        result = roadmap(input_value="mern")

        result_json = json.loads(result)
        lenght_json = len(result_json)
        i =0
        while lenght_json > i:
            # print(f"name of the component {i} : {result_json[i]['name']}")
            search_results = youtube_search(f"one shot video for  {result_json[i]['name']}")
            
            if search_results:
                first_video = search_results[0]
                result_json[i]['embed_url'] = first_video['embed_url']
            print(f"name of the component {i} : {result_json[i]}")
            i= i+1
    except KeyError :
        parsing()    
parsing()