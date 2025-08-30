import os
import requests
from googlesearch import search

def search_and_download_pdf(topic, save_dir="temp_pdfs"):
    # Create temporary directory for downloads
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    # Google search for PDF files
    query = f"{topic} filetype:pdf"
    pdf_links = []
    for url in search(query, num_results=5):  # Limit to 5 results
        if url.endswith(".pdf"):
            pdf_links.append(url)

    if not pdf_links:
        return {"error": "No PDFs found for the given topic."}


    return { "links": pdf_links}
