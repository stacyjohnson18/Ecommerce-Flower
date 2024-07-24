import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <>
            <Header />
            <div className='pagenotfound' style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                height: "60vh"
            }}>
                <h1> 404 Page Not Found</h1>
                <Link to="/">Go To Home</Link>
            </div>
        </>
    )
}

export default PageNotFound
