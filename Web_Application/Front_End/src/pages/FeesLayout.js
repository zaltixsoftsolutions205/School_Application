import React from "react";
import Sidebar from "./Sidebar";
import Fees from "./Fees";
import Navbar from "../components/navbar";
function FeesLayout() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <Navbar />
            <Fees />
        </div>
    );
}

export default FeesLayout;
