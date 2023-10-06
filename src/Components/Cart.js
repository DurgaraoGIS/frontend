import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export default function Cart() {
    const jwtToken = Cookies.get("jwtToken")
    const [cartdata,setcartdata]=useState()
    useEffect(()=>{
        const function1=async ()=>{
            try {
                const response = await axios.get("http://localhost:5000/cart")
                
                console.log(response)
        
              } catch (error) {
                console.error('Error fetching data:', error);
              }



        }

        function1()
    })


    if(jwtToken===undefined){
        return <Navigate to="/login" />

    }
    else{
        return (
            <div>
                <center><h1>CART</h1></center>
                <div className='card shadow m-5 border-dark card-box'>

        
                </div>
              
            </div>
          )

    }
}
