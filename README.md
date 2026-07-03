# 🏢 Society Maintenance Tracker

A full-stack Society Maintenance Tracker developed using **React, TypeScript, Flask, JWT Authentication, and SQLite**. The application helps housing societies efficiently manage complaints, notices, residents, and maintenance activities through a clean and responsive interface.

---

## 🚀 Features

### 👤 Authentication
- Secure Login System
- JWT Authentication
- Role-based access (Admin & Resident)

### 📊 Dashboard
- Resident Dashboard
- Admin Dashboard
- Complaint Statistics
- Notice Statistics

### 📝 Complaint Management
- Register Complaints
- View Complaint History
- Complaint Categories
- Priority Levels
- Complaint Status Tracking
- Search Complaints

### 📢 Notice Management
- Publish Notices
- View Society Notices
- Search Notices

### 🎨 User Interface
- Responsive Design
- Modern UI
- Clean Dashboard Layout
- Fast Navigation

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Flask
- Flask SQLAlchemy
- Flask JWT Extended
- Flask Migrate
- Flask Bcrypt
- Flask CORS

### Database
- SQLite

---

## 📁 Project Structure

```
Society-Maintenance-Tracker
│
├── backend
│   ├── app
│   ├── migrations
│   ├── instance
│   ├── run.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── assets
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Nairayadav/Society-Maintenance-Tracker.git

cd Society-Maintenance-Tracker
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python run.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Modules

- Authentication API
- Complaint API
- Notice API
- Dashboard API

---

## Future Improvements

- Maintenance Payment Module
- Visitor Management
- Email Notifications
- Resident Profile Management
- Admin Analytics
- Dark Mode
- File Upload for Complaints

---

## Author

**Naira Yadav**

- GitHub: https://github.com/Nairayadav
- LinkedIn: https://www.linkedin.com/in/naira-yadav-0141802a8/

---

## License

This project is developed for learning, academic, and portfolio purposes.
