import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/Header';
import Footer from '../components/Footer';
import './Products.css';
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

const ProductCategory = () => {
    const params = useParams()

    const [product, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    
    useEffect(()=>{
        if(params.slug) getProductByCat()
    }, [params.slug]);

    const getProductByCat = async () =>{

        try {

     const {data} = await axios.get(`http://127.0.0.1:8088/api/v1/product/product-category/${params.slug}`)
       setProducts(data?.products);
      setCategory(data?.category);
        } catch (error) {
            console.log("error")
        }
      }
    console.log(product)
    console.log(category)

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
        product.map((p)=>(
            <>
            <div className="product" onClick={() => gotoview(item)}>
            <Link to={`/products/${p.slug}`}>
                <div className="product-img">
                  <img src={`http://127.0.0.1:8088/api/v1/product/product-photo/${p._id}`} width= "200px"></img>
                </div>
  
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">
                {/* {p.description.substring(0, 30)}... */}
              </p>
              <p className="card-text"> $ {p.price}</p>
              <button onClick={()=> gotoview(item)} className="product-cart">ADD TO CART</button>
            </Link>
            </div> 
            </>

        ))
      }
      </div>
     </div>

    <Footer />  
    </>
    
  )
}

export default ProductCategory