import React from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Navbar from "../components/navbar";
function DashboardLayout() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <Navbar />
            <Dashboard />
        </div>
    );
}

export default DashboardLayout;
