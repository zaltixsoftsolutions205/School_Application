# 📘 EduConnect – School Management System

EduConnect is a full-stack school management system developed to streamline daily academic and administrative operations for schools. It consists of a web application for administrators and teachers, and a mobile application for parents. Both platforms interact with a centralized backend and database, ensuring real-time synchronization of data.

---

## 🚀 Tech Stack Used

### 🖥 Web Application (Admin & Teacher)
- **Frontend:** React.js, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  

### 📱 Mobile Application (Parent)
- **Frontend:** React Native, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  

---

## ⚙️ Prerequisites & Tools Required

Make sure the following software and tools are installed:

### ✅ General Requirements
- Node.js (v14+)
- npm (Node Package Manager)
- MySQL Server (XAMPP, WAMP, or standalone)
- Git

### ✅ Web App Tools
- Visual Studio Code (or any modern editor)
- Chrome or any modern browser
- Postman (optional, for API testing)

### ✅ Mobile App Tools
- Android Studio
- React Native CLI
- Android Emulator or physical Android device
- Expo CLI (optional)

---

## 🧪 How to Run the Project

### 🌐 Web Application

> Open **two terminals** and run the following commands:

**1️⃣ Start the frontend:**
cd Web_Application/Front_End
npm install
npm start


**2️⃣ Start the backend server:**
cd Web_Application/Back_End
npm install
node server.js


###📱 Mobile Application
Open three terminals (VS Code or CMD), and navigate as per below:
**1️⃣ Start the mobile frontEnd:
cd Mob_Application/Frontend
npm install
npx react-native run-android

**2️⃣Launch the Metro bundler (emulator):
cd Mob_Application/Frontend
npx react-native start

**3️⃣ Start the backend server:
cd Mob_Application/Backend
npm install
node server.js

🗃️ Database Setup
Import the school_database.sql file into your MySQL server.

✅ Output & Access
Web App will run on: http://localhost:3000
Backend API: http://localhost:5000
Mobile App will open in emulator or connected Android device.

