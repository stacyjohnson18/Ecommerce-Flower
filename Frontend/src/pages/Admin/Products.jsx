import AdminTopHeader from '../../components/AdminTopHeader'
// import AdminMenu from '../../components/AdminMenu'
import React, { useState, useEffect } from 'react'
import './AdminDashboard.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Products = () => {

    const [product, setProducts] = useState([]);
    const navigate = useNavigate();


    const getAllProduct = async () => {
        try {
            const { data } = await axios.get('http://127.0.0.1:8088/api/v1/product/get-product')
            if (data.success) {
                setProducts(data.product)

            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting Product")
        }
    };

    let sino = 0;

    const handleDelete = async (id) => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `http://127.0.0.1:8088/api/v1/product/delete-product/${id}`
            );
            toast.success("Product Deleted Succfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProduct();

    }, [])


    return (
        <>
            <AdminTopHeader />
            <div className="containerAdmin">
                <div className="row">
                    {/* <div className="col-4">
                        <AdminMenu />
                    </div> */}
                    <div className="col-8" style={{ marginTop: "30px" }}>
                        <h3>All Products</h3>


                        <table id="all-product-table">
                            <tr>
                                <th>SI.NO</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Image</th>

                                <th colSpan="2">Action</th>
                            </tr>
                            {
                                product?.map(p => (
                                    sino++,
                                    <tr>
                                        <td>{sino}</td>
                                        <td key={p._id}>{p.name}</td>
                                        <td key={p._id}>{p.price}</td>
                                        <td key={p._id}>{p.quantity}</td>
                                        <td key={p._id}><img src={`http://127.0.0.1:8088/api/v1/product/product-photo/${p._id}`} alt="" width="100" /></td>
                                        <td>
                                            <Link id="edit" to={`/dashboard/admin/product/${p.slug}`} style={{ width: "100px", display: "block", textDecoration: "none" }}>Edit</Link>
                                        </td>

                                        <td><button id='delete' onClick={() => { handleDelete(p._id) }} style={{ width: "100px" }}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Products