from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.complaint import Complaint
from app.models.notice import Notice

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def dashboard():

    user_id = int(get_jwt_identity())

    total = Complaint.query.filter_by(
        resident_id=user_id
    ).count()

    pending = Complaint.query.filter_by(
        resident_id=user_id,
        status="Pending"
    ).count()

    resolved = Complaint.query.filter_by(
        resident_id=user_id,
        status="Resolved"
    ).count()

    notices = Notice.query.count()

    return jsonify({
        "success": True,
        "dashboard": {
            "total_complaints": total,
            "pending_complaints": pending,
            "resolved_complaints": resolved,
            "total_notices": notices
        }
    })


@dashboard_bp.route("/test")
def test_dashboard():
    return jsonify({
        "success": True,
        "message": "Dashboard module working!"
    })