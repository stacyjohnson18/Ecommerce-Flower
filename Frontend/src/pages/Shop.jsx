import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import './Shop.css';
import Header from "../components/Header";


const Shop = () => {

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
    ];


    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    // const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);

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
    //get products
    const getAllProducts = async () => {
        try {
            // setLoading(true);
            const { data } = await axios.get(`http://127.0.0.1:8088/api/v1/product/get-product`);
            // setLoading(false);
            setProducts(data.product);
        } catch (error) {
            // setLoading(false);
            console.log(error);
        }
    };



    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };


    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("http://127.0.0.1:8088/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.product);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);


    return (
        <>
            <Header />

            <div className="container-fluid row mt-3">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9 offset-1">
                    <h1 className="text-center">All Products</h1>

                    {/* <p>{JSON.stringify(checked, 4)}</p> */}
                    <div className=" flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>

                                <div className="card-body">
                                    <Link to={`/products/${p.slug}`}>
                                        <img
                                            src={`http://127.0.0.1:8088/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> ₹ {p.price}</p>
                                    </Link>
                                    {/* <button
                                        className="btn btn-primary ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button> */}
                                    <button
                                        className="btn btn-secondary ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>

    );
};

export default Shop;
