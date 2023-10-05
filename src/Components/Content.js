import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import './Content.css'
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

export default function Content() {
  const [data, setdata] = useState([])
  const [pname, setname] = useState("")
  const [price, setprice] = useState(0)
  const [show, setShow] = useState(false);
  const [showes, setShowes] = useState(false);
  const [editId, setId] = useState(0)
  const [userdetails, setuserdetails] = useState({})
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleCloses = () => setShowes(false);
  // const handleShows = () => setShowes(true);
  const jwtToken = Cookies.get("jwtToken")
  const navigate = useNavigate()
  console.log(userdetails.username)
  
  

  const header = useMemo(() => {
    return {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    };
  }, [jwtToken]);

  const submitOf = (event) => {
    event.preventDefault()
    const data = {
      productname: pname,
      productprice: price
    }
    try {
      axios.post('http://localhost:5000/products', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      window.location.reload()

    } catch (error) {
      console.log(error)
    }

  }
  const onsubmitEdit = (e) => {
    e.preventDefault()
    const data = {
      productname: pname,
      productprice: price
    }
    try {
      axios.put(`http://localhost:5000/products/${editId}`, data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      window.location.reload()


    } catch (error) {
      console.log(error)
    }

  }

  // const editOf = (id) => {
  //   handleShows()
  //   setId(id)


  // }
  const logoutOf = () => {
    Cookies.remove('jwtToken')
    navigate('/login')

  }

  const nameOf = (event) => {
    setname(event.target.value)
  }
  const valueOf = (event) => {
    setprice(event.target.value)
  }

  useEffect(() => {
    const function1 = async () => {
      try {
        const response = await axios.get("http://localhost:5000/", { headers: header })
        setdata(response.data)
        console.log(response)

      } catch (error) {
        console.error('Error fetching data:', error);
      }


    }
    const function2 = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", { headers: header })
        console.log(response.data.username)
        setuserdetails(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    function1()
    function2()


  }, [header])

  // const deleteOf = (id) => {
  //   axios.delete(`http://localhost:5000/products/${id}`)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  //   window.location.reload()


  // }
  const sortByName = () => {
    axios.get("http://localhost:5000/?orderby=name&order=ASC")
      .then(res => {
        console.log(res)
        setdata(res.data)
      })
      .catch(err => console.log(err))
  }
  const sortByPrice = () => {
    axios.get("http://localhost:5000/?orderby=price&order=ASC")
      .then(res => {
        console.log(res)
        setdata(res.data)
      })
      .catch(err => console.log(err))
  }
  const addtocart=(details)=>{
    console.log(details)
    axios.post(`http://localhost:5000/${userdetails.user_id}`,details)
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>console.log(error))
  }
  

  if (jwtToken === undefined) {
    return <Navigate to="/login" />
  }
  else {
    return (
      <div>
        <div className='d-flex flex-row justify-content-center align-item-center'>
          <center><h1>Products</h1></center>
          <div className='mt-2'>
            <Button onClick={logoutOf}>Logout</Button>

          </div>

        </div>
        <div className='d-flex justify-content-between'>
          <h1>Hello  {userdetails.username} </h1>
          <Button onClick={()=>navigate('/cart')}>Cart</Button>
          

        </div>

        <>
          <center>
            <Button className='m-2' onClick={sortByName}>Name</Button>
            <Button className='m-2' onClick={sortByPrice}>Price</Button>

            {/* <Button className='m-2' variant="primary" onClick={handleShow}>
              Add
            </Button> */}
          </center>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={submitOf}>
                <label>product name</label><br />
                <input type="text" onChange={nameOf}></input><br />
                <label>product price</label><br />
                <input type="number" onChange={valueOf}></input><br /><br />
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleClose}>
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
                <label>product name</label><br />
                <input type="text" onChange={nameOf}></input><br />
                <label>product price</label><br />
                <input type="number" onChange={valueOf}></input><br /><br />
                <Button variant="secondary" onClick={handleCloses}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleCloses}>
                  Save Changes
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>

        </>

        <ul className=" d-flex flex-wrap">{data.map(eachitem => {
          return (
            <li className='list_item m-2' key={eachitem.idproducts}>
              <div className='products '>
                <p>{eachitem.name}</p>
                <p>Price:{eachitem.price}</p>
                {/* <div><button type="button" onClick={() => deleteOf(eachitem.idproducts)}>Delete</button>
                  <button onClick={() => editOf(eachitem.idproducts)}>Edit</button>
                  </div> */}
                <div className='p-1'>
                  <Button type="button" className='m-1' onClick={()=>addtocart(eachitem)}>ADD</Button>
                  <Button type="button" className='m-1'>BUY NOW</Button>
                </div>



              </div>
            </li>
          )
        })}
        </ul>


      </div>
    )
  }
}
