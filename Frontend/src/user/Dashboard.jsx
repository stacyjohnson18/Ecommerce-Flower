import React from 'react';
import UserTopHeader from '../components/UserTopHeader';
import './dashboard.css';
// import UserMenu from './UserMenu';

const Dashboard = () => {
    return (
        <>
            <UserTopHeader />
            <div className="dashboard">
                <div className="dashboard-row">
                    {/* <div className="col-4">
                        <UserMenu />
                    </div> */}
                    <div className="dashboard-img">
                        <img src="/images/slider1.jpg" alt="Background" className="dashboard-image" />
                        <h3>Content</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
