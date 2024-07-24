import React, { useEffect, useState } from 'react'
// import AdminMenu from '../../components/AdminMenu'
import './AdminDashboard.css';
import AdminTopHeader from '../../components/AdminTopHeader'
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {

    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {

        try {
            const { data } = await axios.get('http://127.0.0.1:8088/api/v1/auth/get-users')
            if (data?.success) {
                setUsers(data.users);
            } else {
                toast.error(data.messsage);
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <>
            <AdminTopHeader />
            <div className="containerAdmin">
                <div className="row">
                    <div className="col-8">
                        <h3 style={{ marginTop: "10px" }}>All Users</h3>

                        <table id="user-table">
                            <tr>
                                <th>SI.NO</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>

                            {
                                users?.map((p, i) =>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{p.name}</td>
                                        <td>{p.email}</td>
                                        <td>{p.phone}</td>
                                        <td>{p.address}</td>
                                    </tr>
                                )
                            }
                        </table>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Users