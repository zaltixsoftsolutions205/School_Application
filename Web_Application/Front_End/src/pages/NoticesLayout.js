import React from "react";
import Sidebar from "./Sidebar";
import Notices from "./Notices";
import Navbar from "../components/navbar";
function NoticeLayout() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <Navbar />
            <Notices />
        </div>
    );
}

export default NoticeLayout;
