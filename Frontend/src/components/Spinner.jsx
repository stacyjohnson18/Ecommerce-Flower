import React, { useEffect, useState } from 'react'
import './spinner.css';
import { useNavigate, useLocation } from 'react-router-dom';
const Spinner = ({ path = "login" }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [count, setCount] = useState(3);

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)

        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        });

        return () => clearInterval(interval)
    }, [count, navigate, path])

    return (
        <>
            <div className='spinner'>
                <h3>redirecting to you in {count} second </h3>
                <span class="loader"></span>
            </div>

        </>
    )
}

export default Spinner
