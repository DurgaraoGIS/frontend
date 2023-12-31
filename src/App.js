
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './Components/Content'
import Login from './Components/Login';
import Cart from './Components/Cart'

function App() {
  return (
    <Router>
      <Routes>
        <Route excat path="/login" Component={Login}/>
        <Route path="/" Component={Content}/>
        <Route path="/cart" Component={Cart}/>
      </Routes>
    </Router>
    
  );
}

export default App;
