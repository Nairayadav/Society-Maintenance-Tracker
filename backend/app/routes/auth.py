from flask import Blueprint, request, jsonify

from flask_jwt_extended import create_access_token

from app.extensions import db, bcrypt

from app.models.user import User

auth_bp = Blueprint("auth", __name__)


# -------------------------
# Register
# -------------------------

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({"message": "No input data"}), 400

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    flat_number = data.get("flat_number")

    if not full_name or not email or not password:
        return jsonify({
            "message": "Full name, email and password are required."
        }), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message": "Email already registered."
        }), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        full_name=full_name,
        email=email,
        password=hashed_password,
        phone=phone,
        flat_number=flat_number,
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful",
        "user": user.to_dict()
    }), 201


# -------------------------
# Login
# -------------------------

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({"message": "No input data"}), 400

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "message": "Invalid email or password."
        }), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "message": "Invalid email or password."
        }), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    })


# -------------------------
# Test
# -------------------------

@auth_bp.route("/test")
def test():
    return jsonify({
        "success": True,
        "message": "Authentication module working!"
    })