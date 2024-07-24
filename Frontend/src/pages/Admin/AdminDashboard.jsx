import React from 'react'
import './AdminDashboard.css';
import AdminTopHeader from '../../components/AdminTopHeader';
import Footer from '../../components/Footer';
// import backgroundImage from '../../images/bg.jpeg';

const AdminDashboard = () => {
    return (
        <>
            <AdminTopHeader />
            <div className="dashboard">
                <div className="dashboard-row">
                    <div className="dashboard-img">
                        <img src="/images/slider1.jpg" alt="Background" className="dashboard-image" />
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default AdminDashboard
