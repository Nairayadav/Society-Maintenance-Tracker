from datetime import datetime
from app.extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    full_name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password = db.Column(db.String(255), nullable=False)

    phone = db.Column(db.String(20), nullable=True)

    flat_number = db.Column(db.String(20), nullable=True)

    role = db.Column(db.String(20), default="resident")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    complaints = db.relationship(
        "Complaint",
        backref="resident",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "flat_number": self.flat_number,
            "role": self.role,
        }

    def __repr__(self):
        return f"<User {self.email}>"