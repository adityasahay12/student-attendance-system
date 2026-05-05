# 📊 College Attendance Management System

## 🚀 Overview
A web-based Attendance Management System designed for colleges to efficiently track and manage student attendance. The application allows administrators to add students, mark attendance, and generate detailed reports.

## 🔥 Features
- Add and manage student records (ID, Name, Branch, Semester)
- Mark daily attendance with real-time updates
- Filter students by branch and semester
- Search students by ID or name
- View detailed attendance reports with percentage calculation
- Responsive UI for all devices

## 🛠️ Tech Stack
- HTML
- CSS
- JavaScript
- Firebase Realtime Database

## ⚙️ Core Functionalities
- Student Management System
- Attendance Tracking System
- Report Generation with analytics

## 📂 Project Structure
index.html
style.css
script.js
firebase-config.js


## ▶️ How to Run
1. Clone the repository
2. Open `index.html` in a browser
3. Start managing attendance

## 📊 Data Structure (Firebase)

students/
├── studentId/
│ ├── name
│ ├── branch
│ ├── semester
│ └── attendance (date-wise)


## 💡 Key Concepts Used
- DOM Manipulation
- Event Handling in JavaScript
- Real-time database integration
- Responsive UI design

## 🔐 Security Note
Firebase configuration is included for demo purposes. In production:
- Use secure environment variables
- Apply Firebase security rules
- Implement authentication

## 📌 Future Improvements
- Role-based login system (Admin/Teacher)
- Backend using Spring Boot
- REST API integration
- Dashboard with analytics charts
