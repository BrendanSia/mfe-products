import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export const headerStyle = {
    backgroundColor: '#DEC599',
    padding: '20px',
    borderBottom: '2px solid #ccc',
};

const ListingPage = () => {
    const navigate = useNavigate();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        border: '1px solid #000',
        margin: '0 auto',
    };
    
    const columnStyle = {
        textAlign: 'left',
        padding: '8px',
        borderRight: '1px solid #000',
        backgroundColor: '#f2f2f2',
    };
    
    const lastColumnStyle = {
        ...columnStyle,
        borderRight: 'none',
        border: '1px solid black',
    };

    const tdStyle = {
        textAlign: 'left',
        border: '1px solid black',
        padding: '8px',
    };  

    const thStyle = {
        backgroundColor: '#99BADD',
        textAlign: 'left',
        border: '1px solid black',
        padding: '8px',
    };  

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        textAlign: 'center'
    };

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isDelete, setIsDelete] = useState(false);

    const requestOptions = {
        method: 'GET',
        headers: headers,
      };
  
    
    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/list?page=${page}&size=${pageSize}`, requestOptions);
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        }
    };
    
    fetchProducts();
    }, [page, pageSize, isDelete]);
    
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    function checkString(value) {
        return value === null ? '-' : value;
    }

    const handleClick = (product) => {
        navigate(`/detail`, { state: { code: product.code } });
    };

    const onEditClick = (product) => {
        navigate(`/data-entry`, { state: { code: product.code, isEdit:true } });
    }

    const onDeleteClick = async (product) => {
        let responseData;
        try {
            const response = await fetch(`http://localhost:8080/api/products/delete/${product.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors', 
            });
        responseData = await response.text();

        if(response.ok){
            if (responseData === 'Product deleted successfully') {
                NotificationManager.success(responseData, 'Success', 2000);
            }
        }
        } catch (error) {
            console.error('Error occurred:', error);
        }
        setIsDelete(true)
    }
    
    return (
        <div className='mx-xl'>
        <h1 style={headerStyle}>Product List</h1>
        <NotificationContainer />
        <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Code</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Brand</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={tdStyle}>{checkString(product.id)}</td>
                  <td style={tdStyle}>{checkString(product.code)}</td>
                  <td style={tdStyle}>{checkString(product.name)}</td>
                  <td style={tdStyle}>{checkString(product.category)}</td>
                  <td style={tdStyle}>{checkString(product.brand)}</td>
                  <td style={tdStyle}>{checkString(product.type)}</td>
                  <td style={tdStyle}>{checkString(product.description)}</td>
                  <td style={lastColumnStyle}>
                    <button  onClick={() => handleClick(product)}>
                        <FontAwesomeIcon icon={faEye} /> View
                    </button>
                    <button onClick={() => onEditClick(product)}>
                        <FontAwesomeIcon icon={faPencilAlt}/> Edit
                    </button>
                    <button onClick={() => onDeleteClick(product)}>
                        <FontAwesomeIcon icon={faTrash}/> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
    
        <div style={gridStyle}>
            <button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
                {'<'}
            </button>
            <span>Page {page + 1} of {totalPages}</span>
            <button disabled={page === totalPages - 1} onClick={() => handlePageChange(page + 1)}>
                {'>'}
            </button>
        </div>
        <div>
            <Link to="/data-entry">
                <button>Create Product</button>
            </Link>
        </div>
    </div>
    );
};

export default ListingPage;