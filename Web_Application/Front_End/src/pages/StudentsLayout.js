import React from "react";
import Sidebar from "./Sidebar";
import Students from "./Students";
import Navbar from "../components/navbar";
function StudentsLayout() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <Navbar />
            <Students />
        </div>
    );
}

export default StudentsLayout;
