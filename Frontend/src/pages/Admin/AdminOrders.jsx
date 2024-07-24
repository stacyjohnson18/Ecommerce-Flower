import React, { useState, useEffect } from 'react';
// import AdminMenu from '../../components/AdminMenu';
import './AdminDashboard.css';
import AdminTopHeader from '../../components/AdminTopHeader';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';
const { Option } = Select;
const AdminOrders = () => {

    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
    const [changeStatus, setChangeStatus] = useState("");

    const [auth, setAuth] = useAuth();

    const [orders, setOrders] = useState([]);

    

    const getOrders = async () => {
        try {
            const { data } = await axios.get('http://127.0.0.1:8088/api/v1/auth/all-orders');

            setOrders(data);

        } catch (error) {
            console.log(error);
        }
    }

    const [dropdownOpen, setDropdownOpen] = useState({});
    
    const toggleDropdown = (id) => {
        setDropdownOpen(prevState => ({
        ...prevState,
        [id]: !prevState[id]
        }));
    };


    useEffect(() => {
        if (auth?.token)
            getOrders();
    }, [auth?.token])

    const handleChange = async (orderId, value) => {

        try {
            const { data } = await axios.put(`http://127.0.0.1:8088/api/v1/auth/order-status/${orderId}`, { status: value, });
            getOrders();

        } catch (error) {

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
                    <div className="manage-orders">
                        <h3>Manage Orders</h3>

                        {
                            orders?.map((o, i) => {

                                return (
                                    <>
                                        <table id="order-table">
                                            <tr>
                                                <th>Id</th>
                                                <th>Status</th>
                                                <th>Name</th>
                                                <th>Orders</th>
                                                <th>Payment</th>
                                                <th>Quantity</th>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <a href="#" className="dropdown-link" onClick={(event) => { event.preventDefault(); toggleDropdown(o._id); }}>
                                                        {i + 1}
                                                    </a>
                                                </td>
                                                <td>
                                                    <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                                                        {
                                                            status.map((s, i) => (
                                                                <Option key={i} value={s}>{s}</Option>

                                                            ))
                                                        }
                                                    </Select>
                                                </td>

                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </table>

                                        {dropdownOpen[o._id] && (

                                        <div id={`details-${o._id}`} className="items-list" style={{ padding: "0px", border: "1px solid #ddd", marginTop: "5px" }}>
                                            {
                                                o?.products?.map((item, i) =>
                                                    <div class="items">
                                                        <div class="items-img">
                                                            <img src={`http://127.0.0.1:8088/api/v1/product/product-photo/${item._id}`} />
                                                        </div>
                                                        <div class="items-details">
                                                            <p id="c1-details-text1" style={{ marginTop: "10px", marginBottom: "10px" }}>{item.name}</p>
                                                            <p id="c1-details-text1" style={{ marginBottom: "10px" }}>{item.description.substring(0, 30)}</p>
                                                            <p id="c1-details-text3">₹{item.price}</p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                         )}
                                     
                                    </>
                                )
                            }

                            )
                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default AdminOrders