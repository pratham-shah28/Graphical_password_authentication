import { useState } from "react";
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import baseUrl from '../Resources/BaseURL'
import axios from 'axios'
import { ContactlessOutlined } from "@mui/icons-material";

const Login = ({ fn, fname }) => {
    const [username, setUsername] = useState("")
    const navigate = useNavigate();

    const submit = async () => {



        try {
            fname(username)
            let res = await axios.post(`${baseUrl}/user/images`, { username: username })
            //console.log(res.data)
            fn(res.data)
            navigate("/imageSelection")

        } catch (err) {
            console.log(err)
            alert("invalid username ")
        }


    }

    return (
        <div className="App" style={{
            padding: "200px"
        }}>
            <h1>LOGIN</h1>
            <h1>Enter your username:</h1>
            <TextField
                id="outlined-basic" label="Username" variant="outlined" type="text"
                onChange={(e) => {
                    setUsername(e.target.value)
                }} />

            <Button style={{
                margin: 15
            }}
                variant="contained" onClick={submit}>Submit</Button>
        </div>
    );
}

export default Login;

