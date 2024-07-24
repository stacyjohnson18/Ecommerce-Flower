import React, { useEffect, useState } from 'react';
// import AdminMenu from '../../components/AdminMenu';
import './AdminDashboard.css';
import AdminTopHeader from '../../components/AdminTopHeader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("")

    const navigate = useNavigate();
    // for modal state
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updateName, setUpdateName] = useState(null);


    // add category code
    const addCategory = async (e) => {
        e.preventDefault();
        // console.log(name);
        try {

            const categoryData = new FormData();
            categoryData.append("name", name)
            categoryData.append("photo", photo)

            const { data } = await axios.post('http://127.0.0.1:8088/api/v1/category/create-category', categoryData)

            if (data?.success) {
                toast.success(`${name} is created`);
                window.location.reload();
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            toast.error("Category name not added");
        }
    }

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

    // console.log(categories[5].photo.data.data);
    let sino = 0;

    // update category
    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://127.0.0.1:8088/api/v1/category/update-category/${selected._id}`, { name: updateName });
            if (data.success) {
                toast.success("Category Updated Successfully");
                setSelected(null);
                setUpdateName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    // delete Category
    const deleteCategory = async (pid) => {
        try {
            const { data } = await axios.delete(`http://127.0.0.1:8088/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success("Category deleted");

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    return (
        <>
            <AdminTopHeader />
            <div className="containerAdmin">
                <div className="row">
                    {/* <div className="col-4">
                        <AdminMenu />
                    </div> */}
                    <div className="category-table">
                        <h2 style={{ marginTop: "30px" }}>Manage Category</h2>

                        {/* Add Category form */}

                        <div className="addcategory">

                            <form onSubmit={addCategory}>
                                <input type="text" onChange={(e) => setName(e.target.value)} id="catId" placeholder='Enter category name' required />

                                <div className="category-upload">
                                    <label id='imgid'>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                {/* <div className="mb-3"> */}
                                    {
                                        photo && (
                                            <div className='img-center'>
                                                <img src={URL.createObjectURL(photo)} height="100" alt="" />
                                            </div>
                                        )
                                    }
                                {/* </div> */}

                                <button type='submit' id='addcatbtn'>Add Category</button>
                            </form>
                        </div>

                        <table id="category-table2">
                            <tr>
                                <th>SI.NO</th>
                                <th>Name</th>
                                <th>Photo</th>
                                <th colSpan="2">Action</th>
                            </tr>

                            {
                                categories?.map((c) => (
                                    sino++,
                                    <tr>
                                        <td>{sino}</td>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <img src={`http://127.0.0.1:8088/api/v1/category/category-photo/${c._id}`} width="100px" alt="" />
                                        </td>

                                        <td><button id='edit' onClick={() => { setVisible(true), setUpdateName(c.name), setSelected(c) }}>Edit</button></td>
                                        <td><button id='delete' onClick={() => { deleteCategory(c._id) }}>Delete</button></td>
                                    </tr>

                                ))
                            }
                        </table>

                    </div>
                </div>
            </div>

            {/* modal edit */}
            <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}>

                <form onSubmit={updateCategory} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "35px" }}>
                    <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} style={{ padding: "10px" }} placeholder='Enter category name' required />

                    <button type='submit' style={{ padding: "8px" }} >Update Category</button>

                </form>

            </Modal>
        </>
    )
}

export default AddCategory