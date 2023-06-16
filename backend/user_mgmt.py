from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app, supports_credentials=True)


def create_connection():
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database="ManiMinder",
        user="postgres",
        password="Bubekk",
    )
    return conn


@app.route("/api/users", methods=["POST"])
def create_user():
    conn = create_connection()
    cursor = conn.cursor()
    data = request.get_json()
    user_login = data.get("user_login")
    user_email = data.get("user_email")
    user_password = data.get("user_password")

    # Checking if user login or email exists in DB
    cursor.execute(
        "SELECT user_email, user_login FROM users WHERE user_email = %s OR user_login = %s ",
        (user_email, user_login),
    )
    user_exist = cursor.fetchone()

    # If user_exist login or email is true, mean is existing the message is returned in console, otherwise, create new row with user in DB
    if user_exist:
        return jsonify({"message": "This user exists"})
    else:
        cursor.execute(
            "INSERT INTO users (user_login, user_email, user_password) VALUES (%s, %s, %s)",
            (user_login, user_email, user_password),
        )
    conn.commit()
    conn.close()
    return jsonify({"message": "User created successfully"})


@app.route("/api/users/login", methods=["POST"])
def login_user():
    conn = create_connection()
    cursor = conn.cursor()
    data = request.get_json()
    user_login = data.get("user_login")
    user_email = data.get("user_email")
    user_password = data.get("user_password")

    cursor.execute(
        "SELECT user_id FROM users WHERE (user_login = %s OR user_email = %s) AND user_password = %s",
        (user_login, user_email, user_password),
    )
    set_user = cursor.fetchone()

    if set_user:
        cursor.close()
        conn.close()
        return jsonify({"user_id": set_user[0]})
    else:
        cursor.close()
        conn.close()
        return jsonify({"message": "Invalid login credentials"})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
