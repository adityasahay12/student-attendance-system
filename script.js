// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPtS-hMl0e_bEWXA7B3OKThF283bp_DKY",
    authDomain: "college-df1de.firebaseapp.com",
    databaseURL: "https://college-df1de-default-rtdb.firebaseio.com",
    projectId: "college-df1de",
    storageBucket: "college-df1de.firebasestorage.app",
    messagingSenderId: "659625733128",
    appId: "1:659625733128:web:6ea9cceba3a855367075bd",
    measurementId: "G-NPHZTSMZYS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const addStudentForm = document.getElementById('addStudentForm');
const loadStudentsBtn = document.getElementById('loadStudents');
const saveAttendanceBtn = document.getElementById('saveAttendance');
const attendanceList = document.getElementById('attendanceList');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const reportResult = document.getElementById('reportResult');
const loadingIndicator = document.getElementById('loadingIndicator');

// Tab Switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show active content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

// Add Student
addStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const branch = document.getElementById('branch').value;
    const semester = document.getElementById('semester').value;
    
    try {
        // Check if student already exists
        const studentRef = database.ref(`students/${studentId}`);
        const snapshot = await studentRef.once('value');
        
        if (snapshot.exists()) {
            alert('Student ID already exists!');
            return;
        }
        
        // Add student to database
        await studentRef.set({
            name: studentName,
            branch: branch,
            semester: semester,
            attendance: {}
        });
        
        alert('Student added successfully!');
        addStudentForm.reset();
    } catch (error) {
        console.error('Error adding student:', error);
        alert('Error adding student. Please try again.');
    }
});

// Load Students for Attendance
loadStudentsBtn.addEventListener('click', async () => {
    const branch = document.getElementById('attendanceBranch').value;
    const semester = document.getElementById('attendanceSemester').value;
    
    if (!branch || !semester) {
        alert('Please select both branch and semester');
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    try {
        const studentsRef = database.ref('students');
        const snapshot = await studentsRef.once('value');
        const students = snapshot.val();
        
        attendanceList.innerHTML = '';
        let hasStudents = false;
        
        for (const [id, student] of Object.entries(students)) {
            if (student.branch === branch && student.semester === semester) {
                hasStudents = true;
                const studentDiv = document.createElement('div');
                studentDiv.className = 'student-attendance';
                
                // Check if student was present today
                const isPresentToday = student.attendance && student.attendance[today] === true;
                
                studentDiv.innerHTML = `
                    <div class="student-info">
                        <strong>${student.name}</strong> (${id})
                    </div>
                    <label class="switch attendance-toggle">
                        <input type="checkbox" data-student-id="${id}" ${isPresentToday ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                `;
                attendanceList.appendChild(studentDiv);
            }
        }
        
        if (!hasStudents) {
            attendanceList.innerHTML = '<p>No students found for this branch and semester.</p>';
            saveAttendanceBtn.style.display = 'none';
        } else {
            saveAttendanceBtn.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading students:', error);
        alert('Error loading students. Please try again.');
    }
});

// Save Attendance
saveAttendanceBtn.addEventListener('click', async () => {
    const today = new Date().toISOString().split('T')[0];
    const attendanceData = {};
    
    // Get all attendance toggles
    const toggles = document.querySelectorAll('.attendance-toggle input');
    toggles.forEach(toggle => {
        const studentId = toggle.getAttribute('data-student-id');
        attendanceData[studentId] = toggle.checked;
    });
    
    try {
        // Save attendance for each student
        for (const [studentId, isPresent] of Object.entries(attendanceData)) {
            const attendanceRef = database.ref(`students/${studentId}/attendance/${today}`);
            await attendanceRef.set(isPresent);
        }
        
        alert('Attendance saved successfully!');
        saveAttendanceBtn.style.display = 'none';
        attendanceList.innerHTML = '';
    } catch (error) {
        console.error('Error saving attendance:', error);
        alert('Error saving attendance. Please try again.');
    }
});

// Search and View Report
searchBtn.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Please enter a student ID or name');
        return;
    }
    
    // Show loading indicator
    reportResult.innerHTML = ''; // Clear previous results
    loadingIndicator.style.display = 'block';

    try {
        const studentsRef = database.ref('students');
        const snapshot = await studentsRef.once('value');
        const students = snapshot.val();
        
        let foundStudent = null;
        let studentId = null;
        
        // Search by ID or name
        for (const [id, student] of Object.entries(students)) {
            if (id.toLowerCase() === searchTerm || 
                student.name.toLowerCase().includes(searchTerm)) {
                foundStudent = student;
                studentId = id;
                break;
            }
        }
        
        if (!foundStudent) {
            reportResult.innerHTML = '<p>No student found with the given ID or name.</p>';
            return;
        }
        
        // Calculate attendance statistics
        const attendance = foundStudent.attendance || {};
        const totalDays = Object.keys(attendance).length;
        const presentDays = Object.values(attendance).filter(present => present).length;
        const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
        
        // Display report
        reportResult.innerHTML = `
            <h3>Attendance Report for ${foundStudent.name}</h3>
            <p><strong>Student ID:</strong> ${studentId}</p>
            <p><strong>Branch:</strong> ${foundStudent.branch}</p>
            <p><strong>Semester:</strong> ${foundStudent.semester}</p>
            <p><strong>Total Working Days:</strong> ${totalDays}</p>
            <p><strong>Days Present:</strong> ${presentDays}</p>
            <p><strong>Attendance Percentage:</strong> ${percentage}%</p>
            <div class="attendance-history">
                <h4>Attendance History</h4>
                <table style="width: 100%; margin-top: 10px;">
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    ${Object.entries(attendance).map(([date, present]) => `
                        <tr>
                            <td>${date}</td>
                            <td>${present ? 'Present' : 'Absent'}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error searching student:', error);
        alert('Error searching student. Please try again.');
    } finally {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
    }
}); 