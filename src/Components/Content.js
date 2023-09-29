import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'
import './Content.css'
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

export default function Content() {
    const [data, setdata] = useState([])
    const [pname,setname]=useState("")
    const [price,setprice]=useState(0)
    const [show, setShow] = useState(false);
    const [showes, setShowes] = useState(false);
    const [editId,setId]=useState(0)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloses = () => setShowes(false);
    const handleShows = () => setShowes(true);
    const jwtToken=Cookies.get("jwtToken")
    
    const header = useMemo(() => {
      return {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      };
    }, [jwtToken]);
    
    const submitOf=(event)=>{   
        event.preventDefault()
        const data={
            productname:pname,
            productprice:price
        }
        try{
            axios.post('http://localhost:5000/products',data)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            window.location.reload()

        }catch(error){
            console.log(error)
        }

    }
    const onsubmitEdit=(e)=>{
        e.preventDefault()
        const data={
            productname:pname,
            productprice:price
        }
        try{
            axios.put(`http://localhost:5000/products/${editId}`,data)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            window.location.reload()
            

        }catch(error){
            console.log(error)
        }

    }

    const editOf=(id)=>{
        handleShows()
        setId(id)

        
    }

    const nameOf=(event)=>{
        setname(event.target.value)
    }
    const valueOf=(event)=>{
        setprice(event.target.value)
    }
    
    useEffect(() => {
      
        axios.get("http://localhost:5000/",{headers:header})
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => console.log(err))
    },[header])

    const deleteOf = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        window.location.reload()


    }
    const sortByName=()=>{
      axios.get("http://localhost:5000/?orderby=name&order=ASC")
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => console.log(err))
    }
    const sortByPrice=()=>{
      axios.get("http://localhost:5000/?orderby=price&order=ASC")
            .then(res => {
                console.log(res)
                setdata(res.data)
            })
            .catch(err => console.log(err))
    }
    
    if(jwtToken===undefined){
      return <Navigate to="/login"/>
    }
    else{
    return (
        <div>
            <center><h1>Products</h1></center>
            <>
     <center>
      <Button className='m-2' onClick={sortByName}>Name</Button>
      <Button className='m-2' onClick={sortByPrice}>Price</Button>
      
       <Button className='m-2' variant="primary" onClick={handleShow}>
        Add
      </Button></center>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitOf}>
            <label>product name</label><br/>
            <input type="text" onChange={nameOf}></input><br/>
            <label>product price</label><br/>
            <input type="number" onChange={valueOf}></input><br/><br/>
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  type="submit" onClick={handleClose}>
            Save Changes
          </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
      <Modal show={showes} onHide={handleCloses}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onsubmitEdit}>
            <label>product name</label><br/>
            <input type="text" onChange={nameOf}></input><br/>
            <label>product price</label><br/>
            <input type="number" onChange={valueOf}></input><br/><br/>
            <Button variant="secondary" onClick={handleCloses}>
            Close
          </Button>
          <Button variant="primary"  type="submit" onClick={handleCloses}>
            Save Changes
          </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
      
    </>
     
            <ul>{data.map(eachitem => {
                return (
                    <li className='list_item' key={eachitem.idproducts}>
                        <p>{eachitem.name}</p>
                        <p>{eachitem.price}</p>
                        <div><button type="button"  onClick={() => deleteOf(eachitem.idproducts)}>Delete</button>
                            <button onClick={()=>editOf(eachitem.idproducts)}>Edit</button></div>
                    </li>
                )
            })}
            </ul>
            

        </div>
    )
          }
}
