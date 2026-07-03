from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.complaint import Complaint

complaints_bp = Blueprint("complaints", __name__)


@complaints_bp.route("/", methods=["POST"])
@jwt_required()
def create_complaint():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No input data provided."
            }), 400

        required_fields = ["title", "description", "category"]

        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "success": False,
                    "message": f"{field} is required."
                }), 400

        complaint = Complaint(
            title=data["title"],
            description=data["description"],
            category=data["category"],
            priority=data.get("priority", "Medium"),
            resident_id=int(get_jwt_identity())
        )

        db.session.add(complaint)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Complaint submitted successfully.",
            "complaint": complaint.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@complaints_bp.route("/my", methods=["GET"])
@jwt_required()
def my_complaints():
    try:
        user_id = int(get_jwt_identity())

        complaints = Complaint.query.filter_by(
            resident_id=user_id
        ).order_by(
            Complaint.created_at.desc()
        ).all()

        return jsonify({
            "success": True,
            "count": len(complaints),
            "complaints": [
                complaint.to_dict()
                for complaint in complaints
            ]
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500