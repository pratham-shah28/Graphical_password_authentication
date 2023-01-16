import { useState } from 'react'
import { default as URL } from '../Resources/ImageURL'
console.log(URL);
const arr = []
const Image = ({ url }) => {
    let element
    const [list, setList] = useState([])
    const addImage = () => {
        element= document.getElementById(url)
        console.log(element)
        if (!arr.includes(url) && arr.length !== 5) {
            arr.push(url)
            element.classList.add("imgSelected");
            setList(arr)
        }
        else if (arr.includes(url)) {
            arr.splice(arr.indexOf(url), 1)
            element.classList.remove("imgSelected")
            setList(arr)
        }
        else {
            alert("You cannot select more than 5 elements")
        }

    }


    return (
        <>

            <img src={url} alt="img1"  width="15%" onClick={addImage} class= "img" id= {url} />
            &nbsp;&nbsp;
            {/* {restImage()}
          {console.log("decoy length:",decoy)} */}
            {console.log(arr)}
        </>


    )
}

export default Image;
export {  arr }