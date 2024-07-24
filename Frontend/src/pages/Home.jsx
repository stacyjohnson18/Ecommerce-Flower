import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './Home.css';
// import { useAuth } from '../context/auth';
import axios from 'axios';
// import { toast } from 'react-toastify';

import { useCart } from '../context/cart';


const Home = () => {

  // const [auth, setAuth] = useAuth();
  // Define arrays for different sections

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [cart, setCart] = useCart();



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


  //get products
  const getAllProducts = async () => {
    try {

      const { data } = await axios.get("http://127.0.0.1:8088/api/v1/product/get-product");

      setProducts(data.product);
    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts()
  }, []);


  return (
    <>
      <Header />
      <pre>
        {/* {
          JSON.stringify(auth, null, 4)
        } */}
      </pre>
      <div class="container1-slider">
        <img src="images/slider/slider2.jpg" />
      </div>


      <div className="container2-shop">
        <h2 id="shop-text1">Everyday Occasions</h2>
        <p id="shop-text2">Adding love & beauty to every occasion</p>
        <div className="shop-section">
          {categories?.map((catelist) => 
            <Link to={`/product-category/${catelist.slug}`}>
              <div className="block">
                <div className="block-img">
                  <img src={`http://127.0.0.1:8088/api/v1/category/category-photo/${catelist._id}`} />
                </div>
                <div className="desc">
                  <p>{catelist.name}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      

      <Footer />
    </>
  );
}

export default Home;



