import React, { useState,useEffect } from 'react';
import { headerStyle } from './ListingPage';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useLocation, Link } from 'react-router-dom';

const inputStyles = {
    width: 'calc(100% - 60px)',
    padding: '5px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const labelStyles = {
    marginBottom: '5px',
    fontWeight: 'bold',
};

const containerStyles = {
    width: '400px',
    margin: '20px auto',
    backgroundColor: '#cceeff',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex', 
    flexDirection: 'column' 
};

const submitButtonStyle = {
    width: '200px',
    margin: '20px auto',
    display: 'flex'
}

const DataEntryPage = () => {
  const location = useLocation();
  const code = location.state?.code;
  const isEdit = location.state?.isEdit;
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    brand: '',
    type: '',
    description: ''
  });
  const [existingData, setExistingData] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editMode = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/detail/${code}`);
      const data = await response.json();
      setFormData(prevState => ({
        ...prevState, 
        code: data?.code,
        name: data?.name,
        category: data?.category,
        brand: data?.brand,
        type: data?.type,
        description: data?.description
      }));
    } catch (error) {
      console.error('Error occurred:', error);
    } 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let responseData;
    try {
      if (isEdit) {
          const response = await fetch(`http://localhost:8080/api/products/process/${code}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          mode: 'cors', 
        });
        responseData = await response.text();
      } else {
          const response = await fetch('http://localhost:8080/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          mode: 'cors', 
        });
        responseData = await response.text();
      }

      if (true) {
          if (responseData === 'Product saved successfully') {
            NotificationManager.success(responseData, 'Success', 2000);
          } else if (responseData === 'Record updated successfully') {
            NotificationManager.success(responseData, 'Success', 2000)
          } else if (responseData === 'Product already exists') {
            NotificationManager.error(responseData, 'Error', 2000);
          }
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      editMode();
    }
  }, [isEdit])

  return (
    <div>
        <header style={headerStyle}>
            <h1>Create Product</h1>
        </header>
        <NotificationContainer />
        <form onSubmit={handleSubmit}>
            <div style={containerStyles}>
                <label style={labelStyles}>Code:</label>
                <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    style={{ ...inputStyles }}
                    placeholder='P120'
                    required
                />

                <label style={labelStyles}>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ ...inputStyles }}
                    placeholder='Red Dinner Gown'
                    required
                />

                <label style={labelStyles}>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{ ...inputStyles }}
                    placeholder='Fashion'
                />

                <label style={labelStyles}>Brand:</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    style={{ ...inputStyles }}
                    placeholder='No Brand'
                />

                <label style={labelStyles}>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={{ ...inputStyles }}
                    placeholder='Women Dress'
                />

                <label style={labelStyles}>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{ ...inputStyles }}
                />
            </div> 
            <button type="submit" style={submitButtonStyle}>Save</button>
        </form>
        <div>
            <Link to="/listing">
                <button>To Listing Page</button>
            </Link>
        </div>
    </div>
  );
};

export default DataEntryPage;