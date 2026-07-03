from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app import db
from app.models.notice import Notice

notices_bp = Blueprint("notices", __name__)


# -----------------------------
# Get All Notices
# -----------------------------
@notices_bp.route("/", methods=["GET"])
@jwt_required()
def get_notices():
    try:
        notices = Notice.query.order_by(
            Notice.created_at.desc()
        ).all()

        return jsonify([notice.to_dict() for notice in notices]), 200

    except Exception as e:
        return jsonify({
            "message": "Failed to fetch notices.",
            "error": str(e)
        }), 500


# -----------------------------
# Create Notice
# -----------------------------
@notices_bp.route("/", methods=["POST"])
@jwt_required()
def create_notice():
    try:
        data = request.get_json() or {}

        title = data.get("title", "").strip()
        description = data.get("description", "").strip()

        if not title:
            return jsonify({
                "message": "Title is required."
            }), 400

        if not description:
            return jsonify({
                "message": "Description is required."
            }), 400

        notice = Notice(
            title=title,
            description=description,
        )

        db.session.add(notice)
        db.session.commit()

        return jsonify({
            "message": "Notice created successfully.",
            "notice": notice.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "message": "Failed to create notice.",
            "error": str(e)
        }), 500