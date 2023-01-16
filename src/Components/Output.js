import { useState, useEffect } from 'react';
import '../App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from './Grid';
let elements = document.getElementsByTagName("img")

const Output = ({ selectedImg, setSelectedImg, fn }) => {

    useEffect(() => {

        if (status == 1) {
            console.log("Hola")
            console.log(elements[0].classList)
            for (let i = 0; i < elements.length; i++) {
                console.log("Hello there")
                elements[i].classList.remove("outputImg1")
            }
        }
    })

    const [status, setStatus] = useState(1)
    const [final, setFinal] = useState([])

    const navigate = useNavigate()

    const submit = () => {
        let lis = []
        setSelectedImg(lis)
        setFinal([])
        return (
            navigate("/login")
        )
    }

    const handleSubmit = () => {
        if (final.length === 5) {
            fn(final)
            navigate("/logpixel")
        }
    }

    const reset = () => {

        setStatus(1)
        setFinal([])
    }

    const addImage = (item) => {
        if (final.includes(item)) {
            alert("You've already selected this image!")

        }
        else {
            const inc = status + 1
            setStatus(inc)
            if (inc > 6) {
                alert("Can't select more than 5 images")
            }
            else {
                let elements = document.getElementsByTagName("img")
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].getAttribute("src").slice(0, elements[i].getAttribute("src").indexOf("?")) == item) {
                        elements[i].classList.add("outputImg1")
                    }
                }

                let tempchange = final
                tempchange.push(item)
                console.log(status + item + " selected")
                setFinal(tempchange)
                console.log(final)
            }
        }
    }

    return (
        <>
            <h1 align="center">Sequentialize the images</h1>
            <div className="App">
                <ImageList sx={{
                    width: 1000,
                    height: 230
                }}
                    cols={5}
                    rowHeight={4}
                >
                    {selectedImg.map((item) => (
                        <ImageListItem key={item}>
                            <img
                                className="selected"
                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                loading="lazy"
                                onClick={() => addImage(item)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

                <div>
                    <Button style={{
                        margin: 10
                    }}
                        variant="contained" onClick={submit}>Back to Login</Button>
                    <Button style={{
                        margin: 10
                    }}
                        variant="contained" onClick={reset}>Re-enter</Button>

                    <Button onClick={handleSubmit} style={{
                        margin: 10
                    }}
                        variant="contained" >Submit</Button>

                </div>
            </div>
        </>
    );
}

export default Output;