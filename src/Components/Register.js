import React from 'react'
import PasswordGenerator from './PasswordGenerator'
import TextForm from './ColForm'
import { useState } from 'react'
function Register({ fn, fnuser }) {

    const [usename, setUsername] = useState("")
    function setUser(user) {
        setUsername(user)
        fnuser(user)
    }
    return (
        <>
            <div id="Title"><h1><center><u>User Registration</u></center></h1></div>
            <br /><br />
            <TextForm fn={setUser} />
            <PasswordGenerator fn={fn} />

        </>
    )
}

export default Register