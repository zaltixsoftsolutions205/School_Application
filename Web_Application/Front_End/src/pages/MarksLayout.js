import React from "react";
import Sidebar from "./Sidebar";
import Marks from "./Marks";
import Navbar from "../components/navbar";
function MarksLayout() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <Navbar />
            <Marks />
       
        </div>
    );
}

export default MarksLayout;
