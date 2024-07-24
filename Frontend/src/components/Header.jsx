// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import axios from 'axios';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const [categories, setCategories] = useState([]);

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem("auth");

        toast.success("Logout Successfully");

        

    }

      //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8088/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  console.log(categories);

    return (

        <div className="header">

            <div className="container1-menu">
                <div className="menu-logo">
                    <Link to="/"><img src="/images/logo.png" alt="" /></Link>
                </div>

                <div className="menu-search">
                    <input className="search-input" placeholder="Search flowers" />
                    <i className="fa-solid fa-magnifying-glass"></i>

                </div>

                <div className="menu-icons">
                    <div className="nav-profile dropdown">
                        <i className="fa-solid fa-user"></i>
                        <ul class="profile-dropdown">
                            {
                                auth.user ?
                                    <>

                                        <li><Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
                                        <li><Link onClick={handleLogout} to="/signin">Logout</Link></li>
                                    </>
                                    :
                                    <>
                                        <li><Link to="/signup">New Customer? Sign Up</Link> </li>
                                        <li><Link to="/signin">Login</Link></li>
                                    </>
                            }
                        </ul>
                    </div>

                    <Link to ="/Contactus"><i className="fa-solid fa-phone"></i></Link>
                    <div className="menu-cart">
                        <Link to="/cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                        <span id="count">{cart?.length}</span>
                    </div>
                </div>
            </div>

            <nav class="container2-navbar">
                <ul>
                    <li class="dropdown">
                        <a href="">Flowers  <i class="fa-solid fa-caret-down"></i></a>
                        <ul class="navbar-dropdown">
                            {
                                categories.map((item)=>
                                    <li>
                                        <Link to={`/product-category/${item.slug}`}>{item.name}</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </li>
                </ul>
                <div className='navbar-description'>
                    <p>Welcome to Bloom Bliss – Your Online Destination for Exquisite Flowers</p>
                    
                </div>
            </nav> 

            <div class="navbar-deliveries">
                <div class="navbar-icon">
                    <i class="fa-solid fa-bars" ></i>
                </div>
                <div class="navbar-text">
                    <span> For Deliveries in <i class="fa-solid fa-location-dot"></i> : </span>
                    <div class="countries-icons">
                        <img src="/images/country/australia.jpeg" width="50px" height="30px" />
                        <img src="/images/country/australia.jpeg" width="50px" alt="" height="30px" />
                        <img src="/images/country/new zealand.jpeg" width="50px" alt="" height="30px" />
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Header;



