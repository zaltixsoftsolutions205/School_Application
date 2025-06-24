import React from "react";
import Sidebar from "./Sidebar";
import RegisterStudent from "./RegisterStudent";
function RegisterStudentLayout() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <RegisterStudent />
        </div>
    );
}

export default RegisterStudentLayout;
