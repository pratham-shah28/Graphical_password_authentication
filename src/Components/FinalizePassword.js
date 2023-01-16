import { arr } from "./Image";

import { default as URL } from "../Resources/ImageURL";
import { useNavigate } from "react-router-dom"
// console.log("arr1: ",arr)
const key = Object.keys(URL)
let decoy=[]

const FinalizePassword = ({ fn }) => {

    // console.log("decoy at finalize", decoy)
    const navigate = useNavigate()
    const gotarr = (e) => {
        e.preventDefault();
        // console.log("decoy at btn", decoy)
        if (arr.length === 5) {
            makeDecoy();
            fn(true)
            navigate('/regpixel')
        }
        else {
            alert("select five images first")
        }

    }
    const makeDecoy = () => {
        function shuffleArray(array) 
        {
            for (var i = array.length - 1; i > 0; i--) {
      
                // Generate random number
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
      
        for (let i = 0; i < key.length; i++) 
        {
            const newArr = URL[key[i]].filter((item) => !arr.includes(item))
            for (let j = 0; j < 5; j++) {
                const n = (Math.floor(Math.random() * 50)) % newArr.length
                if (!decoy.includes(newArr[n]))
                    decoy.push(newArr[n])
                else j--;
                newArr.slice(n, 1)
            }
        }

        decoy = decoy.concat(arr)
        decoy = shuffleArray(decoy)
        console.log("decoy length:", decoy)
        // fn(decoy)
      
        // return (
        //     <>
        //         <h2>{decoy.length}</h2>
        //     </>
        // )
      }

    return (
        <>
        <center>
            <button onClick={gotarr} id="final">Finalize Password</button>
            </center>
            <br/><br/>
        </>
    )
}

export default FinalizePassword
export {decoy}