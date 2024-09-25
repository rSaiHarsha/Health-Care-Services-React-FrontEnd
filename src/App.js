import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceList from './components/ServiceList';
import AddService from './components/AddService';
import EditService from './components/EditService';
import Footer from './components/Footer';

const App = () => {
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [editServiceIndex, setEditServiceIndex] = useState(null);

  // Load services from localStorage on component mount
  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  // Update localStorage whenever services change
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const handleAddClick = () => {
    setShowAddService(true);
    setEditServiceIndex(null);
  };

  const handleServiceAdded = (newService) => {
    setServices([...services, newService]);
    setShowAddService(false);
  };

  const handleEditClick = (index) => {
    setEditServiceIndex(index);
    setShowAddService(false);
  };

  const handleServiceUpdated = (updatedService) => {
    const updatedServices = services.map((service, index) =>
      index === editServiceIndex ? updatedService : service
    );
    setServices(updatedServices);
    setEditServiceIndex(null);
  };

  const handleServiceDeleted = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        {showAddService ? (
          <AddService onServiceAdded={handleServiceAdded} goBack={() => setShowAddService(false)} />
        ) : editServiceIndex !== null ? (
          <EditService 
            service={services[editServiceIndex]} 
            onServiceUpdated={handleServiceUpdated} 
            goBack={() => setEditServiceIndex(null)} // Add goBack for returning to ServiceList
          />
        ) : (
          <ServiceList 
            services={services} 
            onAddClick={handleAddClick} 
            onEditClick={handleEditClick} 
            onDeleteClick={handleServiceDeleted} 
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
