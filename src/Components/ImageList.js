import Image from './Image'
import url from '../Resources/ImageURL'
import { useState, useEffect } from 'react';
import { arr } from './Image';

const CatImage = ({ cat }) => {
  const len = url[cat].length
  const URL = url[cat]
  const [src, setSrc] = useState(0)
  const [show, setShow]= useState(false)

  useEffect(()=>{
    let elements = document.getElementsByTagName("img")
    for(let i=0; i<elements.length; i++)
    {
      
          if(!arr.includes(elements[i].id)&&elements[i].classList.contains("imgSelected"))
          {
              elements[i].classList.remove("imgSelected")
          }
          else if(arr.includes(elements[i].id)&&!elements[i].classList.contains("imgSelected"))
          {
            elements[i].classList.add("imgSelected")
          }
      
    }
  })

const changeImgList = () => {
  setSrc(src + 6)
  
  
}
  
    


  return (
    <>
      <center>
      {/* <h3 align="center">{cat}</h3> */}
      <button type="button" onClick={()=>setShow(!show)} class="cat">{cat}</button>
      <br/>
      {!show? <></>:
      
      <div>
        
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Image url={URL[src % len]} />
        <Image url={URL[(src + 1) % len]} />
        <Image url={URL[(src + 2) % len]} />
        <Image url={URL[(src + 3) % len]} />
        <Image url={URL[(src + 4) % len]} />
        <Image url={URL[(src + 5) % len]} />
      
        <br/><br/>
        <button type="button" onClick={changeImgList} class="more">Show More</button>
      </div>
      }
              <br/><hr/>

      
      </center>

    </>
  )

}

export default CatImage