
import { useState } from "react"

const TextForm = ({ fn }) => {

  const [username, setUsername] = useState("")

  function handleUser(e) {
    setUsername(e.target.value)
    fn(e.target.value)
  }


  return (
    <div class="row">
      <div class="column">
        <label for="name"> &nbsp;&nbsp;Username </label>
        {/* <br /><br /> */}
        {/* <label for="email"> &nbsp;&nbsp;Email id </label>
        <br /><br />
        <label for="Contact"> &nbsp;&nbsp;Phone Number </label>
        <br /><br />
        <label> &nbsp;&nbsp;Gender </label><br /> */}
      </div>
      <div class="column column2">
        <input onChange={(e) => handleUser(e)} type="text" id="name" name="username" /><br /><br />
        {/* <input type="text" id="email" name="Email_id" /><br /><br />
        <input type="text" id="Contact" name="Phone" /><br /><br />
        <input type="radio" id="M" name="gender" value="Male" />
        <label for="M">Male </label>
        <input type="radio" id="F" name="gender" value="Female" />
        <label for="F">Female </label>
        <input type="radio" id="Oth" name="gender" value="Others" />
        <label for="Oth">Others </label> */}
      </div>
    </div>
  )
}

export default TextForm
