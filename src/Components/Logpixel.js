/* global SimpleImage */
import React from 'react'
import { useState, useEffect } from "react"
import baseUrl from '../Resources/BaseURL'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Logpixel({ arr, name, fn, fname }) {

    const navigate = useNavigate()
    var hashArray = []
    var k = 0
    var array = []
    var arrG = []

    useEffect(() => {
        setTimeout(() => {
            getHash()
        }, 400)
    }, [])

    function getHash() {

        var pic = document.getElementById("prime")

        function getMousePosition(canvas, event, array) {
            let rect = canvas.getBoundingClientRect();

            let x = (event.clientX - rect.left);
            let y = (event.clientY - rect.top);
            array.push(x);
            array.push(y);
            console.log("Coordinate x: " + x,
                "Coordinate y: " + y);
        }

        function getGroup(x, y) {

            var low = 120
            var high = 80

            var gx = parseInt(x / low)
            var gy = parseInt(y / high)
            gx = (gx === 0) ? 1 : gx
            gy = (gy === 0) ? 1 : gy

            arrG.push(gx)
            arrG.push(gy)

        }


        function getHashFromGroup(x, y, idx) {

            var url = arr[idx]
            const dimg = new Image();
            dimg.crossOrigin = "Anonymous";
            dimg.src = url


            setTimeout(() => {
                const image = new SimpleImage(dimg);

                var low = 120
                var high = 80
                var gx = x
                var gy = y

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
                console.log("hash here: ", hash)

                hashArray.push(hash)

            }, 500);

        }


        const pos = (e) => {
            if (k < 4) {
                k++;
                console.log("K here: ", k)
                getMousePosition(pic, e, array);
            }
            if (k === 4) {


                for (var i = 0; i < 7; i += 2) {
                    getGroup(array[i], array[i + 1])
                }

                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 7; j += 2) {
                        getHashFromGroup(arrG[j], arrG[j + 1], i)
                    }

                }

                setTimeout(() => {

                    let encrypt = ""
                    encrypt = encrypt.concat(hashArray[2])
                    encrypt = encrypt.concat(hashArray[4])
                    encrypt = encrypt.concat(hashArray[10])
                    encrypt = encrypt.concat(hashArray[15])
                    encrypt = encrypt.concat(hashArray[17])

                    console.log("encrypt here is: ", encrypt)

                    axios.post(`${baseUrl}/user/login`, {
                        username: name,
                        passhash: encrypt
                    }).then(res => {
                        console.log("result for password entry is here: ", res.data)
                        fn(res.data.auth)
                        fname(res.data.username)
                        if (res.data.auth) {
                            navigate("/dashboard")
                        }
                        else {
                            alert("Invalid password")
                            navigate("/login")
                        }

                    })
                        .catch(err => {
                            console.log(err)
                            alert("invalid password")
                        })

                }, 700)

                pic.removeEventListener("mousedown", pos)

            }
        }

        pic.addEventListener("mousedown", pos)

    }








    return (

        <div>

            <div style={{
                padding: "20px",
                textAlign: "center",
                fontSize: "20px",
            }}><img id="prime" alt="image1" src={`${arr[0]}`} class="verify" />
                <h4>Click 4 times to select positions</h4>
            </div>

        </div>
    )
}

export default Logpixel