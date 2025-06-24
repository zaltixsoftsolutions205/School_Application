import React from "react";
import Sidebar from "./Sidebar";
import Attendance from "./Attendance";
import Navbar from "../components/navbar";
function AttendanceLayout() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <Navbar />
            <Attendance/>
        </div>
    );
}

export default AttendanceLayout;
