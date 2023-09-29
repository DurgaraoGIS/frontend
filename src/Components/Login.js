import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Login() {
  
  const [uname, setname] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate();
  


  const nameOf = (event) => {
    console.log(uname)
    setname(event.target.value)
  }

  const passOf = (event) => {
    console.log(password)
    setpassword(event.target.value)
  }
  const submitof = (e) => {
    e.preventDefault()
    const data = {
      username: uname,
      password: password

    }
    try {
      axios.post('http://localhost:5000/login', data)
        .then(res => {
          const jwtToken = res.data.jwtToken
          if (jwtToken === undefined) {
            console.log("login failed")
          }
          else {
            
            Cookies.set('jwtToken',jwtToken,{expires: 30})
            navigate('/')


          }
        })
        .catch(err => console.log(err))


    } catch (error) {
      console.log(error)
    }


  }
  const onsignup = (e) => {
    e.preventDefault()
    const data = {
      username: uname,
      password: password

    }
    try {
      axios.post('http://localhost:5000/signup', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))


    } catch (error) {
      console.log(error)
    }


  }
  const jwtToken=Cookies.get("jwtToken")
  if(jwtToken===undefined){
return (
    <div><center>
      <h1>login</h1>
    </center>
      <center>
        <form onSubmit={submitof}>
          <label >username</label><br />
          <input type="text" onChange={nameOf} /><br />
          <label>Password</label><br />
          <input type="password" onChange={passOf} /><br />
          <Button className='m-2' type="submit">submit</Button>
          <Button className='m-2' onClick={onsignup}>Sign u</Button>

        </form>
      </center>

    </div>
  )
}else{
  return <Navigate to="/"/>
}
}
