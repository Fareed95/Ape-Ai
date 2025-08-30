# Use the official Python image from the Docker Hub
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . /app/

# Expose the port used by Gunicorn
EXPOSE 8001

# Start the server using app.py inside the api directory
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:8001", "--timeout", "500", "api.app:app"]

