import React, { useEffect, useState } from 'react';
import UserTopHeader from '../components/UserTopHeader';
import './dashboard.css';
// import UserMenu from './UserMenu';
import axios from 'axios';
import { useAuth } from '../context/auth';
import moment from 'moment';

import '../components/Cart.css';

const Order = () => {
    const [auth, setAuth] = useAuth();

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get('http://127.0.0.1:8088/api/v1/auth/orders');

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

    return (
        <>
            <UserTopHeader />
            <div className="containerAdmin">
                <div className="row">
                    {/* <div className="col-4">
                        <UserMenu />
                    </div> */}
                    <div className="manage-orders">
                        <h3>order</h3>
                        {
                            orders?.map((o, i) => {

                                return (
                                    <>
                                        <table id="order-table">
                                            <tr>
                                                <th>#</th>
                                                <th>Status</th>
                                                <th>Buyer</th>
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
                                                <td>{o?.status}</td>
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
            </div >
        </>
    )
}

export default Order