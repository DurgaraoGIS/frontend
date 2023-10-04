import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

export default function Cart() 

{
    const jwtToken = Cookies.get("jwtToken")
    if(jwtToken===undefined){
        return <Navigate to="/login" />

    }
    else{
        return (
            <div>
                <center><h1>CART</h1></center>
                <div>
        
                </div>
              
            </div>
          )

    }
}
