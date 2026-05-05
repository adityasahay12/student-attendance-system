# College Attendance Management System

A simple and responsive web-based attendance management system for colleges, built with HTML, CSS, and JavaScript, using Firebase Realtime Database for data storage.

## Features

- Add new students with their details (ID, Name, Branch, Semester)
- Mark daily attendance for students
- Filter students by branch and semester
- View detailed attendance reports
- Search students by ID or name
- Responsive design that works on all devices
- Real-time data storage using Firebase

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in a web browser
3. The system is already configured with Firebase credentials

## Usage

### Adding Students
1. Click on "Add Student" in the sidebar
2. Fill in the student details (ID, Name, Branch, Semester)
3. Click "Add Student" to save

### Marking Attendance
1. Click on "Mark Attendance" in the sidebar
2. Select the branch and semester
3. Click "Load Students" to see the student list
4. Use the toggle switches to mark attendance
5. Click "Save Attendance" to save the attendance for the day

### Viewing Reports
1. Click on "View Report" in the sidebar
2. Enter a student ID or name in the search box
3. Click "Search" to view the attendance report
4. The report shows:
   - Total working days
   - Days present
   - Attendance percentage
   - Detailed attendance history

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- Uses Firebase Realtime Database for data storage
- Responsive design using CSS Flexbox
- Modern UI with Font Awesome icons
- No external dependencies except Firebase SDK

## Data Structure

The data is stored in Firebase Realtime Database with the following structure:

```
students/
  ├── studentId1/
  │   ├── name: "Student Name"
  │   ├── branch: "CSE"
  │   ├── semester: "1"
  │   └── attendance/
  │       ├── "2024-03-20": true
  │       └── "2024-03-21": false
  └── studentId2/
      └── ...
```

## Security

The Firebase configuration is included in the code for demonstration purposes. In a production environment, you should:

1. Set up proper Firebase security rules
2. Implement user authentication
3. Store sensitive configuration in environment variables

## License

This project is open source and available under the MIT License. 