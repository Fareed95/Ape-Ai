import psycopg2
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Fetch database credentials from .env
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

# Initialize Flask app
app = Flask(__name__)

# Database connection function
def get_db_connection():
    return psycopg2.connect(
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        dbname=DBNAME
    )

# Create users table if not exists
def create_table():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS testing (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL
            );
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("Users table created successfully (if not exists).")
    except Exception as e:
        print(f"Error creating table: {e}")

# API route to add a user
@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO testing (name, email) VALUES (%s, %s) RETURNING id;", (name, email))
        user_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "User added successfully", "id": user_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# API route to fetch all users
@app.route("/users", methods=["GET"])
def get_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM testing;")
        users = cursor.fetchall()
        cursor.close()
        conn.close()

        user_list = [{"id": u[0], "name": u[1], "email": u[2]} for u in users]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask app
if __name__ == "__main__":
    create_table()  # Ensure table is created
    app.run(debug=True)
