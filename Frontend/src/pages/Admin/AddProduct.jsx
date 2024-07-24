import React, { useState, useEffect } from 'react'
// import AdminMenu from '../../components/AdminMenu'
import './AdminDashboard.css';
import AdminTopHeader from '../../components/AdminTopHeader'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://127.0.0.1:8088/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category")
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [])


    // add Product
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // for Images

            const productData = new FormData();
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            productData.append("shipping", shipping)

            const { data } = await axios.post('http://127.0.0.1:8088/api/v1/product/create-product', productData)

            if (data?.success) {

                toast.success("Product created successfully");
                navigate('/dashboard/admin/products');

            } else {

                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    }
    return (
        <>
            <AdminTopHeader />
            <div className="productAdmin">
                <div className="product-row">
                    <div className="product-table">
                        <h2>Add Product</h2>

                        <div className="addproduct">

                            <form onSubmit={handleCreate}>

                                <div className='selects-category'>

                                    <div className="select-category">
                                        <select name="" id="" onChange={(e) => { setCategory(e.target.value) }}>
                                            <option hidden selected>Select Category</option>
                                            {
                                                categories?.map((c) => (
                                                    <option key={c._id} value={c._id}>{c.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="product-upload">
                                        <label id='product-button'>
                                            {photo ? photo.name : "Upload Photo"}
                                            <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                        </label>
                                    </div>

                                    <div className="mb-3">
                                        {
                                            photo && (
                                                <div className='img-center'>
                                                    <img src={URL.createObjectURL(photo)} height="100" alt="" />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="product-input">
                                    <input type="text" placeholder='Enter Product Name' onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="product-input">
                                    <textarea type="text" placeholder='Enter Product Description ' onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="product-input">
                                    <input type="number" placeholder='Enter Price ' onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="product-input">
                                    <input type="number" placeholder='Enter quantity ' onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div className="product-input">
                                    <select onChange={(e) => setShipping(e.target.value)}>
                                        <option hidden>Select Shipping</option>
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                <div className="product-input">
                                    <button type='submit'>Add Product</button>
                                </div>
                            </form>     
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct