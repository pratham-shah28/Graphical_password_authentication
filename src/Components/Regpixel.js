/* global SimpleImage */

import React from 'react'
import { arr } from './Image'
import { useState } from 'react'
import { decoy } from './FinalizePassword'
import axios from 'axios'
import baseUrl from '../Resources/BaseURL'

var arrG = []
var arrG2 = []
var array = []
var array2 = []
var beforeHash = ""
var indicator = 0
var k = 0;
var arrayForEncrypt = []
function Regpixel({ user }) {

    //import baseUrl from '../Resources/BaseURL'
    // axios.get(`${baseUrl}/user`)
    //     .then(res => console.log("res from server:", res))
    //     .catch(err => console.log(err))

    const [username, setUsername] = useState(user)
    const [show, setShow] = useState(false)
    const [btn, setBtn] = useState(true)
    const [btn2, setBtn2] = useState(false)
    const [oarr, setOarray] = useState(arr)
    const [group1, setGroup1] = useState([])
    const [group2, setGroup2] = useState([])
    const [toEncrypt, setEncrypt] = useState("")
    const [eachHash, setEachHash] = useState([])
    function getPos(array, group) {

        var pic = document.getElementById("prime")

        var flag = 0

        function getMousePosition(canvas, event, array) {
            let rect = canvas.getBoundingClientRect();

            let x = (event.clientX - rect.left);
            let y = (event.clientY - rect.top);
            array.push(x);
            array.push(y);
            console.log("Coordinate x: " + x,
                "Coordinate y: " + y);
        }

        function getGroup(x, y, array) {
            var url = arr[0]
            const dimg = new Image();
            dimg.crossOrigin = "Anonymous";
            dimg.src = url
            //dimg.src = url + "?not-from-cache-please";

            setTimeout(() => {
                const image = new SimpleImage(dimg);
                var w = image.getWidth()
                var h = image.getHeight()
                var low = 120
                var high = 80
                var hx = parseInt(w / low)
                var hy = parseInt(h / high)
                var gx = parseInt(x / low)
                var gy = parseInt(y / high)
                array[0] = hx
                array[1] = hy
                if (gx >= hx)
                    gx = hx - 1
                if (gy >= hy)
                    gy = hy - 1
                gx = (gx === 0) ? 1 : gx
                gy = (gy === 0) ? 1 : gy
                array.push(gx)
                array.push(gy)

                var sum = 0

                for (var i = gx * low - 1; i < gx * low + low - 1; i++)
                    for (var j = gy * high - 1; j < gy * high + high - 1; j++) {
                        var pixel = image.getPixel(i, j)

                        sum += pixel.getRed()
                        sum += pixel.getGreen()
                        sum += pixel.getBlue()

                    }

                var toHash = sum.toString()
                let hash = ""

                for (var i = 0; i < toHash.length; i++) {
                    var n = parseInt(toHash.charAt(i))
                    var c = String.fromCharCode(n + 97)
                    hash = hash.concat(c)
                }
                if (indicator === 1) {

                    let arrForeachHash = eachHash
                    arrForeachHash.push(hash)
                    arrayForEncrypt.push(hash)
                    setEachHash(arrForeachHash)
                    beforeHash = beforeHash.concat(hash)
                }
                console.log(hash)

            }, 500);



        }

        const pos = (e) => {
            if (k < 4) {
                k++;
                getMousePosition(pic, e, array);
            }
            if (k === 4) {


                for (var i = 0; i < 7; i += 2) {
                    getGroup(array[i], array[i + 1], group)
                }
                if (indicator === 0) {
                    setBtn2(true)
                }

                k = 0
                pic.removeEventListener("mousedown", pos)
                if (indicator === 0) {
                    setGroup1(arrG)
                }
                if (indicator === 1) {
                    setGroup2(arrG2)
                }
                indicator++
                if (indicator === 2) {
                    setTimeout(() => {
                        checkReselct()
                    }, 700);
                }

            }
        }

        pic.addEventListener("mousedown", pos)


    }


    function checkReselct() {
        for (var i = 0; i < 10; i += 1) {
            if (arrG[i] !== arrG2[i]) {
                array = []
                k = 0
                array2 = []
                arrG = []
                arrG2 = []
                indicator = 0
                beforeHash = ""
                setEachHash([])
                setBtn(true)
                setBtn2(false)
                setShow(false)
                alert("pixel positions do not match previous attempt")
                return
            }
        }
        alert("password confirmed")

        function getHashFromGroup(x, y, idx, arrGroups) {

            var url = arr[idx]
            const dimg = new Image();
            dimg.crossOrigin = "Anonymous";
            dimg.src = url
            //dimg.src = url + "?not-from-cache-please";

            setTimeout(() => {
                const image = new SimpleImage(dimg);
                var w = image.getWidth()
                var h = image.getHeight()
                console.log("here width", w)
                console.log("here height", h)
                var low = 120
                var high = 80
                var hx = parseInt(w / low)
                var hy = parseInt(h / high)
                console.log("groups given: ", x, y)
                console.log("maxes given: ", arrGroups[0], arrGroups[1])
                var gx = Math.ceil(x * (hx / arrGroups[0]))
                console.log("x ratio to mul: ", (hx / arrGroups[0]))
                var gy = Math.ceil(y * (hy / arrGroups[1]))
                console.log("y ratio to mul: ", (hy / arrGroups[1]))
                console.log("groups ratioed: ", gx, gy)

                if (gx >= hx)
                    gx = hx - 1
                if (gy >= hy)
                    gy = hy - 1
                console.log("groups compared to maxes: ", gx, gy)

                gx = (gx === 0) ? 1 : gx
                gy = (gy === 0) ? 1 : gy

                var sum = 0
                for (var i = gx * low - 1; i < gx * low + low - 1; i++)
                    for (var j = gy * high - 1; j < gy * high + high - 1; j++) {
                        var pixel = image.getPixel(i, j)
                        sum += pixel.getRed()
                        sum += pixel.getGreen()
                        sum += pixel.getBlue()
                    }

                var toHash = sum.toString()
                let hash = ""

                for (var i = 0; i < toHash.length; i++) {
                    var n = parseInt(toHash.charAt(i))
                    var c = String.fromCharCode(n + 97)
                    hash = hash.concat(c)
                }
                var arrayForEachHash = eachHash
                arrayForEachHash.push(hash)
                arrayForEncrypt.push(hash)
                setEachHash(arrayForEachHash)
                beforeHash = beforeHash.concat(hash)
                setEncrypt(beforeHash)
            }, 500);

        }

        for (var i = 0; i < 9; i += 2) {
            console.log("final groups: ", arrG[i], arrG[i + 1])
        }

        for (var i = 1; i < 5; i++) {
            for (var j = 2; j < 9; j += 2) {
                getHashFromGroup(arrG[j], arrG[j + 1], i, arrG)
            }

        }

        setTimeout(() => {
            console.log("toencrypt: ", toEncrypt)
            let hashToEncrypt = ""
            console.log("array for encrypt ", arrayForEncrypt)
            hashToEncrypt = hashToEncrypt.concat(arrayForEncrypt[2])
            hashToEncrypt = hashToEncrypt.concat(arrayForEncrypt[4])
            hashToEncrypt = hashToEncrypt.concat(arrayForEncrypt[10])
            hashToEncrypt = hashToEncrypt.concat(arrayForEncrypt[15])
            hashToEncrypt = hashToEncrypt.concat(arrayForEncrypt[17])

            console.log("hashToEncryt:  ", hashToEncrypt)

            const userWithHash = {
                username: username,
                passhash: hashToEncrypt,
                arrimg: decoy
            }

            console.log("user object to be sent to backend ", userWithHash)

            axios.post(`${baseUrl}/user/register`, userWithHash)
                .then(res => console.log("res from server:", res))
                .catch(err => console.log(err))

        }, 900)


    }


    return (
        <>
            <div style={{
                padding: "20px",
                textAlign: "center",
                fontSize: "20px"
            }}>
                <h1><u>Password Validation</u></h1>
                <br />
                <h2>Your selected sequence of images</h2>
            </div>

            <center>
                <img id="i1" alt="image1" width="15%" src={`${oarr[0]}`} class="verify" />
                <img id="i2" alt="image2" width="15%" src={`${oarr[1]}`} class="verify" />
                <img id="i3" alt="image3" width="15%" src={`${oarr[2]}`} class="verify" />
                <img id="i4" alt="image4" width="15%" src={`${oarr[3]}`} class="verify" />
                <img id="i5" alt="image5" width="15%" src={`${oarr[4]}`} class="verify" />
            </center>

            <div style={{
                padding: "20px",
                textAlign: "center",
                fontSize: "20px"

            }}>
                {!btn ? <></> :
                    <button id="positionVerify" onClick={() => {
                        setShow(true)
                        setTimeout(() => {
                            getPos(array, arrG)
                            setBtn(false)
                        }, 400);

                    }}>Click here to expand the primary image</button>
                }
                <br /><br />
                {
                    !show ? <></> : <><img id="prime" alt="image1" src={`${arr[0]}`} class="verify" />
                        <h4>Click 4 times to select positions</h4></>
                }
                <div>
                    {!btn2 ? <></> :
                        <button id="positionVerify" onClick={() => {

                            setTimeout(() => {
                                setBtn2(false)
                                getPos(array2, arrG2)
                            }, 400);

                        }}>Click to reselect pixel positions to confirm</button>
                    }
                </div>

            </div>

        </>
    )
}

export default Regpixel