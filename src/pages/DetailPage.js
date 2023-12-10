import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { headerStyle } from './ListingPage';

const DetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const code = location.state?.code;

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClick = () => {
        navigate('/listing');
    };

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/detail/${code}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProductData();
    }, []);

    return (
        <div>
            <header style={headerStyle}>
                <h1>Product Detail Page</h1>
            </header>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {productData && (
                <div>
                    <p>Product ID: {productData.id}</p>
                    <p>Name: {productData.name}</p>
                    <p>Description: {productData.description}</p>
                </div>
            )}
            <button onClick={handleClick}>Back To Listing</button>
        </div>
    );
};

export default DetailPage;