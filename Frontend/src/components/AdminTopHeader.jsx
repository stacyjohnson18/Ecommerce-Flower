import React from 'react'
import { Link } from 'react-router-dom'
import './adminMenu.css';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import { MdDashboard } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { FaUsers } from "react-icons/fa";


const AdminTopHeader = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    }

    return (
        <>
            <nav className='adminNav'>
                <div className="logo">
                    <Link>ADMIN DASHBOARD</Link>
                </div>
                <div className="menulist">
                    <ul>
                        <li><Link onClick={handleLogout} to="/signin">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            
            <div className="adminMenu">
                <div className="admin-row">
                    <ul>
                       
                        <li><Link to="/dashboard/admin"><MdDashboard style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} />
                            DASHBOARD</Link></li>
                        <li>
                            <Link to="/dashboard/admin/create-category"> <IoMdCreate style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} /> Add Category</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/admin/create-product"> <IoMdCreate style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} />
                                Add Product</Link>
                        </li>

                        <li>
                            <Link to="/dashboard/admin/products"> <IoMdCreate style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} />
                                Manage Product</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/admin/orders"> <IoMdCreate style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} />
                                Manage Orders</Link>
                        </li>

                        <li>
                            <Link to="/dashboard/admin/users"> <FaUsers style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} /> Users</Link>
                        </li>
                    </ul>
                </div>
            </div>



        </>
    )
}

export default AdminTopHeader