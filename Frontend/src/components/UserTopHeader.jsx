import React from 'react'
import { Link } from 'react-router-dom'
import './adminMenu.css';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import { MdDashboard } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";


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
                    <Link>USER DASHBOARD</Link>
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
                        <li><Link to="/dashboard/user"><MdDashboard style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} />
                            DASHBOARD</Link></li>
                        <li>
                            <Link to="/dashboard/user/profile"> <IoMdCreate style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} /> Profile</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/user/orders"> <IoMdCreate style={{ fontSize: "22px", verticalAlign: "middle", margin: "10px" }} />
                                Orders</Link>
                        </li>


                    </ul>
                </div>
            </div>



        </>
    )
}

export default AdminTopHeader