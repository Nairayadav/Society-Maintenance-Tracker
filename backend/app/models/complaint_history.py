from datetime import datetime
from app.extensions import db


class ComplaintHistory(db.Model):
    __tablename__ = "complaint_history"

    id = db.Column(db.Integer, primary_key=True)

    complaint_id = db.Column(
        db.Integer,
        db.ForeignKey("complaints.id"),
        nullable=False
    )

    old_status = db.Column(db.String(50))

    new_status = db.Column(db.String(50))

    updated_by = db.Column(db.String(100))

    remarks = db.Column(db.Text)

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )