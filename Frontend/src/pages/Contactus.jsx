import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './Contactus.css';

const Contactus = () => {
  return (
    <>
    <Header/>
      <div class="container">
        <h1>Contact Us</h1>
        <div class="admin-info">
          <h2>Admin Information</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> <a href="mailto:admin@example.com">admin@gmail.com</a></p>
          <p><strong>Phone:</strong> +1 (234) 567-890</p>
        </div>
      {/* <div class="contact-form">
        <h2>Send Us a Message</h2>
        <form action="#" method="post">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" required/>
          
          <label for="email">Your Email</label>
          <input type="email" id="email" name="email" required/>
          
          <label for="message">Your Message</label>
          <textarea id="message" name="message" rows="6" required></textarea>
          
          <button type="submit">Submit</button>
        </form>
      </div> */}
    </div>
    <Footer/>
    </>
    
  )
}

export default Contactus