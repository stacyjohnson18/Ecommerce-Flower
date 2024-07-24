import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from "axios";

import './Signup.css';

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.warn(name, email, phone, address, password)

    // let result = await fetch('http://127.0.0.1:8080/api/v1/auth/register', {
    //   method: 'post',
    //   body: JSON.stringify({ name, email, password }),
    //   headers: {
    //     'Content-Type': "application/json"
    //   },
    // })

    // result = await result.json();
    // console.warn(result)

    // if (result) {
    //   navigate('/admin/dashboard');
    // } else {
    //   alert("User not registered")
    // }

    try {

      const res = await axios.post("http://127.0.0.1:8088/api/v1/auth/register", {
        name, email, password, phone, address
      });

      if (res.data.success) {

        toast.success(res.data.message);
        navigate("/signin")

      } else {
        toast.error(res.data.message);
      }


    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }


  };


  return (
    <>
      <Header />
      <div className="signup">

        <h2 id="text-signup">Sign up</h2>
        <p id="text-link">Already have an account? <Link to="/signin">Sign In</Link></p>

        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="username"><p>Full Name:</p><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required /></div>
            <div className="username"><p>Email-ID: </p><input type="text" onChange={(e) => { setEmail(e.target.value) }} required value={email} placeholder="Email-ID" /></div>

            <div className="username"><p>Phone: </p><input type="text" placeholder="Phone" value={phone} required onChange={(e) => setPhone(e.target.value)} /></div>
            <div className="username"><p>Address: </p><input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required /></div>
            <div className="password"><p>Password: </p><input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" required /></div>

            <div className="submit-signup">
              <button>SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signup