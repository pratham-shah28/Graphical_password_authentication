import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Grid from './Grid';


//let element
const ImageGrid = ({ decoy, selectedImg, setSelectedImg, fn }) => {
    let lis = decoy.slice(0, 5)
    const [index, setIndex] = useState(0);
    const [status, setStatus] = useState(1)
    const [selection, setSelection] = useState(lis)

    useEffect(() => {
        console.log("decoy is ", decoy)
        let arr = []
        for (let i = 0; i < selectedImg.length; i++) {
            arr.push(selectedImg[i])
        }

        let elements = document.getElementsByTagName("img")
        console.log("first: ", elements[0].getAttribute("src"))
        if (arr.includes(String(elements[0].getAttribute("src"))))
            console.log("guess what")
        console.log("img:", arr)
        console.log(elements[0].getAttribute("src"))
        for (let i = 0; i < elements.length; i++) {
            if (!arr.includes(elements[i].getAttribute("src").slice(0, elements[i].getAttribute("src").indexOf('?'))) && elements[i].classList.contains("imgSelected1")) {
                elements[i].classList.remove("imgSelected1")
            }
            else if (arr.includes(elements[i].getAttribute("src").slice(0, elements[i].getAttribute("src").indexOf('?'))) && !elements[i].classList.contains("imgSelected1")) {
                elements[i].classList.add("imgSelected1")
            }

        }
    })


    const navigate = useNavigate()

    const submit = () => {
        let lis = []
        setSelectedImg(lis)
        return (
            navigate("/login")
        )
    }
    const prev = () => {
        if (index > 5) {

            //const tempIndex = index - 5
            setSelection(decoy.slice(index - 10, index - 5))
            setIndex(index - 5)

        }
        console.log(index)
        console.log(decoy.slice(index - 10, index - 5))

    }
    const output = () => {
        if (status < 6) {
            alert("You didn't select enough images for output")
        } else {
            let shuffArr = selectedImg.slice()
            shuffArr = shuffArr.sort(() => Math.random() - 0.5)
            setSelectedImg(shuffArr)
            console.log(selectedImg)
            return (
                navigate("/output")
            )
        }
    }


    const next = () => {
        if (index <= 25) {
            setSelection(decoy.slice(index, index + 5))
            setIndex(index + 5)
            console.log(index)
        }
        console.log(decoy.slice(index, index + 5))
    }
    const addImage = (item) => {
        console.log("item selected: ", item)

        if (selectedImg.includes(item)) {

            let tempchange = selectedImg
            tempchange = tempchange.filter(value => value !== item)
            setSelectedImg(tempchange)
            const inc = status - 1
            setStatus(inc)
        }
        else {
            const inc = status + 1
            setStatus(inc)
            if (inc > 6) {
                alert("Can't select more than 5 images")
            }
            else {
                let tempchange = selectedImg
                tempchange.push(item)
                console.log(status + item + " selected")
                setSelectedImg(tempchange)
                console.log(selectedImg)
            }
        }
    }

    const reset = () => {
        let lis = []
        setSelectedImg(lis)
        setStatus(1)
    }
    return (
        <>
            <h1 align="center">Choose the 5 images you use as your password</h1>
            <div className="App">
                <ImageList sx={{
                    width: 1000,
                    height: 230
                }}
                    cols={5}
                    rowHeight={4}
                >
                    {selection.map((item) => (
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
                {console.log(selectedImg)}

                <div>
                    <Button style={{
                        margin: 10
                    }}
                        variant="contained" onClick={prev}>Previous</Button>
                    <Button style={{
                        margin: 10
                    }}
                        variant="contained" onClick={next}>Next</Button>
                    <Button style={{
                        margin: 10
                    }}
                        variant="contained" onClick={submit}>Reset to Login</Button>
                    <Button style={{
                        margin: 10
                    }}
                        variant="contained" onClick={output}>Go to output</Button>
                    <Button style={{
                        margin: 10
                    }}
                        variant="contained" onClick={reset}>Reset elements</Button>
                </div>
                {/* <Grid selectedImg={selectedImg} /> */}
                <div>


                </div>

            </div>

        </>
    );
}



export default ImageGrid;
