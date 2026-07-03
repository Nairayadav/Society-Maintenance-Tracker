from flask import Flask

from .config import Config

from .extensions import (
    db,
    migrate,
    jwt,
    bcrypt,
    cors,
)


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    # -------------------------
    # Home Route
    # -------------------------
    @app.route("/")
    def home():
        return {
            "message": "Society Maintenance Tracker API is running 🚀",
            "status": "success",
            "version": "1.0.0",
        }

    # Import models
    from app.models import User, Complaint, ComplaintHistory, Notice

    # Import blueprints
    from .routes.auth import auth_bp
    from .routes.complaints import complaints_bp
    from .routes.dashboard import dashboard_bp
    from .routes.notices import notices_bp

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(complaints_bp, url_prefix="/api/complaints")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(notices_bp, url_prefix="/api/notices")

    return app