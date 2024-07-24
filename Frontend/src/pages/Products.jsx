import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Products.css';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.log(error));
  }, [])

  const gotoview = (item) => {
    navigate(`/products/${item.id}`)
  }
  return (
    <>
      <Header />

      <div className="product-container">
        <h2 id="shop-text1">Everyday Occasions</h2>
        <p id="shop-text2">Adding love & beauty to every occasion</p>
        <div className="product-section">
          {
            data ? (
              data.map((item) =>
                // {products1.map((product) => (
                //   <Link to={`/products/${product.id}`} key={product.id}>
                //   {/* <Link to="/productsdetail" > */}
                <div className="product" onClick={() => gotoview(item)}>
                  <div className="product-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="description">
                    <p>{item.id}</p>
                    {/* <p>{item.price} <del>{product.discount}</del><span id="product-offer">{product.offer}</span><span id="ratings">4.8 </span></p> */}
                    <p>{item.price}</p>
                    {/* <p id="product-text">Earliest Delivery: <b>{product.delivery}</b> <span id="review">{product.reviews} Review</span></p> */}
                    <p id="product-text">Earliest Delivery:</p>
                  </div>
                  {/* <button onClick={()=> gotoview(item)} className="product-cart">ADD TO CART</button> */}
                </div>
                // </Link>
              )
            ) : (
              <h1>Loading .... </h1>
            )
          }


        </div>
      </div>


      <Footer />
    </>
  );
}


export default Products;



