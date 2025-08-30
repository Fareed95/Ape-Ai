# Dockerfile for Django

# Use the official Python image from the Docker Hub
FROM python:3.11

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install gunicorn
# Copy the entire project into the container
COPY . /app/

# Start the server
CMD ["gunicorn", "--workers","4","--bind", "0.0.0.0:8010", "Chat_bots.wsgi:application"]