from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from config import db_config
import json

app = Flask(__name__)
CORS(app, supports_credentials=True)


def create_connection():
    conn = psycopg2.connect(**db_config)
    return conn


@app.route("/api/users", methods=["POST"])
def create_user():
    conn = create_connection()
    cursor = conn.cursor()
    data = request.get_json()
    user_login = data.get("user_login")
    user_email = data.get("user_email")
    user_password = data.get("user_password")
    user_settings = {"lang": "eng", "theme": "dark"}
    user_settings_json = json.dumps(user_settings)

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
            "INSERT INTO users (user_login, user_email, user_password, user_settings) VALUES (%s, %s, %s, %s)",
            (user_login, user_email, user_password, user_settings_json),
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
        "SELECT user_id, user_login, user_settings FROM users WHERE (user_login = %s OR user_email = %s) AND user_password = %s",
        (user_login, user_email, user_password),
    )
    set_user = cursor.fetchone()

    if set_user:
        cursor.close()
        conn.close()
        return jsonify(
            {
                "user_id": set_user[0],
                "user_login": set_user[1],
                "user_settings": set_user[2],
            }
        )
    else:
        cursor.close()
        conn.close()
        return jsonify({"message": "Invalid login credentials"})


@app.route("/api/users/update_settings", methods=["OPTIONS", "POST"])
def change_settings():
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
        }
        return ("", 204, headers)
    else:
        conn = create_connection()
        cursor = conn.cursor()
        data = request.get_json()
        user_id = data.get("user_id")
        new_theme = data.get("theme")
        new_lang = data.get("lang")

        cursor.execute("SELECT user_settings FROM users WHERE user_id = %s", (user_id,))
        user_settings = cursor.fetchone()

        if user_settings:
            settings = json.loads(json.dumps(user_settings[0]))
            settings["theme"] = new_theme if new_theme else settings.get("theme")
            settings["lang"] = new_lang if new_lang else settings.get("lang")

            cursor.execute(
                "UPDATE users SET user_settings = %s WHERE user_id = %s",
                (json.dumps(settings), user_id),
            )
            conn.commit()
            conn.close()
            return jsonify({"message": "User settings updated successfully"})
        else:
            conn.close()
            return jsonify({"message": "User not found"})


@app.route("/api/users/update_credentials", methods=["POST"])
def change_credentials():
    conn = create_connection()
    cursor = conn.cursor()
    data = request.get_json()
    user_id = data.get("user_id")
    old_email = data.get("old_email")
    old_password = data.get("old_password")
    new_email = data.get("new_email")
    new_password = data.get("new_password")

    # Sprawdź poprawność danych użytkownika
    cursor.execute("SELECT user_email, user_password FROM users WHERE user_id = %s", (user_id,))
    user_data = cursor.fetchone()

    if user_data:
        stored_email, stored_password = user_data

        # Sprawdź poprawność starego e-maila lub hasła
        if (old_email and old_email == stored_email) or (old_password and old_password == stored_password):
            if new_email:
                # Zaktualizuj adres e-mail użytkownika
                cursor.execute("UPDATE users SET user_email = %s WHERE user_id = %s", (new_email, user_id))
                conn.commit()
                conn.close()
                return jsonify({"message": "User email changed successfully"})
            elif new_password:
                # Zaktualizuj hasło użytkownika
                cursor.execute("UPDATE users SET user_password = %s WHERE user_id = %s", (new_password, user_id))
                conn.commit()
                conn.close()
                return jsonify({"message": "User password changed successfully"})
            else:
                conn.close()
                return jsonify({"message": "No changes provided"})
        else:
            conn.close()
            return jsonify({"message": "Invalid old email or old password"})
    else:
        conn.close()
        return jsonify({"message": "Invalid user credentials"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
