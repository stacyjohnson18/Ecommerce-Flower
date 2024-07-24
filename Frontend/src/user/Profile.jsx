import React, { useState, useEffect } from 'react'
import UserTopHeader from '../components/UserTopHeader';
import './dashboard.css';
// import UserMenu from './UserMenu';
import { useAuth } from '../context/auth';
import axios from "axios";
import { toast } from 'react-toastify';


const Profile = () => {

  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://127.0.0.1:8088/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <>
      <UserTopHeader />
      <div className="containerAdmin">
        <div className="row">
          {/* <div className="col-4">
            <UserMenu />
          </div> */}
          <div className="user-profile">
            <h3>Profile</h3>

            <div className="signup-form">
              <form onSubmit={handleSubmit}>
                <div className="username"><p>Full Name:</p><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required /></div>
                <div className="username"><p>Email-ID: </p><input type="text" onChange={(e) => { setEmail(e.target.value) }} required value={email} placeholder="Email-ID" disabled /></div>

                <div className="username"><p>Phone: </p><input type="text" placeholder="Phone" value={phone} required onChange={(e) => setPhone(e.target.value)} /></div>
                <div className="username"><p>Address: </p><input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>


                <div className="password"><p>Password: </p><input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" /></div>

                <div className="submit">
                  <button type='submit'>Update Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile