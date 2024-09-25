import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddService = ({ onServiceAdded, goBack }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    const newService = {
      name,
      description,
      price: parseFloat(price),
    };
    onServiceAdded(newService);
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleAddService}>
        <h2 className="mb-4">Add New Service</h2>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Service</button>
      </form>
      <button onClick={goBack} className="btn btn-secondary mt-3">Back to Services</button>
    </div>
  );
};

export default AddService;

