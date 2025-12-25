from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DEMO_USER = {"username": "demo", "password": "demo"}
DEMO_TOKEN = "demo-token"

@app.get("/health")
def health():
    return jsonify({"status": "ok"})

@app.post("/login")
def login():
    data = request.get_json(silent=True) or {}

    if (
        data.get("username") == DEMO_USER["username"]
        and data.get("password") == DEMO_USER["password"]
    ):
        return jsonify({"token": DEMO_TOKEN})

    return jsonify({"error": "invalid_credentials"}), 401

@app.get("/me")
def me():
    auth = request.headers.get("Authorization", "")

    if auth == f"Bearer {DEMO_TOKEN}":
        return jsonify({"name": "Andy", "role": "Tester"})

    return jsonify({"error": "unauthorised"}), 401


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
