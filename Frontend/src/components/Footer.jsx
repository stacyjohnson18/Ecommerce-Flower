import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer"> 

      <div class="container7-footer">

        <div class="footer-text">
            <p>Welcome to our blooming paradise at [Website Name], where flowers speak the language of beauty and elegance. Explore a delightful array of vibrant blooms that enchant with their colors and fragrances. Whether you're celebrating a special occasion, expressing love, or simply brightening someone's day, our curated selection of fresh flowers offers the perfect choice for every moment.</p>
        </div>
        

        <div class="footer-block">
            <h3>Get to know us</h3>
            <ul>
                <li><Link to="/Contactus">Contact Us</Link></li>
                <li><Link to="/Terms">Terms & Conditions</Link></li>
            </ul>
        </div>

        <div class="footer-block">
            <h3>Connect with us</h3>
            <ul>
                <li><a href="https://www.instagram.com/">Instagram</a></li>
                <li><a href="https://www.facebook.com/">Facebook</a></li>
                <li><a href="https://twitter.com/">Twitter</a></li>
            </ul>
        </div>

      </div>

      <div class="container8-footer">
          <div class="logo">
              <img src="/images/logo.png"/>
          </div>
          <div class="copyright">
              <p>© 2022-2024, Bloomy.com, All rights reserved</p>
          </div>
      </div>

    </div>
  );
}

export default Footer;

