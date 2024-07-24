import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from './Footer';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './SingleProduct.css';

import { toast } from 'react-toastify';
import axios from 'axios';
import { useCart } from '../context/cart';

const SingleProduct = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [cart, setCart] = useCart();
    const params = useParams()
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `http://127.0.0.1:8088/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `http://127.0.0.1:8088/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }

        const Prices = [
            {
                _id: 0,
                name: "₹100 to 199",
                array: [100, 199],
            },
            {
                _id: 1,
                name: "₹200 to 399",
                array: [200, 399],
            },
            {
                _id: 2,
                name: "₹400 to 599",
                array: [400, 599],
            },
            {
                _id: 3,
                name: "₹600 to 999",
                array: [600, 799],
            },
            {
                _id: 4,
                name: "₹1000 to 1200",
                array: [1000, 1200],
            },
            {
                _id: 4,
                name: "₹1200 or more",
                array: [1200, 9999],
            },
        ]
    };

    return (
        <>
            <Header />
            <div class="product1">

                <div class="product-image">
                    <div class="main-image">
                        <img src={`http://127.0.0.1:8088/api/v1/product/product-photo/${product._id}`} />
                    </div>
                </div>

                <div class="product-details">
                    <h2>{product.name}</h2>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    {/* <span class="rating">4.8 </span> */}

                    <p class="price">$ {product.price} </p>
                    <p id="taxes" >Inclusive of all taxes</p>

                    <button id="cart" onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");

                    }}>Add to Cart</button>

                    <div class="description">
                        <h4>Product Details:</h4>
                        <ul>
                            <li>{product.description}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="suggestion">
                <h3>You May Also Like</h3>

                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}

                <div class="suggestion-option">
                    {relatedProducts?.map((p) => (
                        <div class="suggestion-block">
                            <div class="suggestion-img">
                                <img src={`http://127.0.0.1:8088/api/v1/product/product-photo/${p?._id}`} />
                            </div>


                            <p id="title">{p.name}</p>
                            <p id="desc">{p.description.substring(0, 30)}...</p>
                            <p id="price">${p.price}</p>
                            <button onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, p])
                                );
                                toast.success("Item Added to cart");

                            }}>ADD TO CART</button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    )
}
export default SingleProduct