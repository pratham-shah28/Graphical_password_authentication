import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    return (
        <div style={{
            fontSize: "40px",
            textAlign: "center",
            paddingTop: "40px",
        }}>Home
            <br></br>
            <div style={{
                fontSize: "40px",
                textAlign: "center",
                paddingTop: "120px",
            }} >
                <a href="/login">Login</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <a href="/register">Register</a>

            </div>
        </div>
    )
}

export default Home