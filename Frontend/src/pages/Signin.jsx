import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Signin.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/auth';


const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post("http://127.0.0.1:8088/api/v1/auth/login", { email, password }

      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data))


        navigate(location.state || "/");

      } else {
        toast.error(res.data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }


  }


  return (
    <>
      <Header />
      <div class="signin">

        <h2 id="text-signin">Sign In</h2>
        <p id="text-link">Dont have an account? <Link to="/signup">Sign Up</Link></p>


        <div class="signin-form">
          <form onSubmit={handleLogin}>
            <div class="username"><p>Email: </p><input type="text" placeholder="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div class="password"><p>Password: </p><input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <div class="submit">
              <button type='submit'>SIGN IN</button>
            </div>
          </form>
        </div>

        <div class="forgot">
          <a href="#">Forgot Password?</a>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Signin