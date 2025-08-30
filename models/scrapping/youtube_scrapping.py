import json
from googleapiclient.discovery import build
import os
from dotenv import load_dotenv

load_dotenv()

def youtube_search(query, max_results=10):
    api_key = os.getenv("GOOGLE_API_KEY")  # Load API key from .env
    youtube = build("youtube", "v3", developerKey=api_key)

    #
    request = youtube.search().list(
        part="snippet",
        q=query,
        type="video",
        maxResults=max_results
    )
    response = request.execute()
    results = []
    for item in response['items']:
        video_data = {
            "video_id": item['id']['videoId'],
            "title": item['snippet']['title'],
            "description": item['snippet'].get('description', 'No description available'),
            "channel": item['snippet']['channelTitle'],
            "channel_id": item['snippet']['channelId'],
            "published_at": item['snippet']['publishedAt'],
            "thumbnails": item['snippet']['thumbnails'],
            "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
            "embed_url": f"https://www.youtube.com/embed/{item['id']['videoId']}"
        }
        results.append(video_data)

    return json.dumps(results, indent=4)  # Convert to JSON format with indentation

if __name__ == "__main__":
    search_results_json = youtube_search("Legal Research and Analysis in Drafting in laws", max_results=10)
    print(search_results_json)  # Print in JSON format
