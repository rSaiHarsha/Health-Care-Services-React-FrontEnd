import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditService = ({ service, onServiceUpdated, goBack }) => {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);

  // Update the state when the service prop changes
  useEffect(() => {
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
  }, [service]);

  const handleUpdateService = (e) => {
    e.preventDefault();

    const updatedService = {
      name,
      description,
      price: parseFloat(price),
    };

    onServiceUpdated(updatedService);
    goBack(); // Navigate back after updating
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleUpdateService}>
        <h2 className="mb-4">Edit Service</h2>
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
        <button type="submit" className="btn btn-warning">Update Service</button>
        <button type="button" onClick={goBack} className="btn btn-secondary ms-2">Cancel</button>
      </form>
    </div>
  );
};

export default EditService;
