import React from 'react'

function Dashboard({ name }) {
    return (
        <div
            style={{
                padding: "20px",
                textAlign: "center",
                fontSize: "120px",
            }}> Welcome {name} !!! </div>
    )
}

export default Dashboard