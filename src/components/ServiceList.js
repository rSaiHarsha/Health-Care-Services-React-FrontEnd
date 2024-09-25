import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ContactUs from './ContactUs';
import AddService from './AddService';
import EditService from './EditService';
import About from './About';

const ServiceList = () => {
  const [services, setServices] = useState(() => {
    const storedServices = localStorage.getItem('services');
    return storedServices ? JSON.parse(storedServices) : [];
  });
  const [isAddingService, setIsAddingService] = useState(false);
  const [isEditingService, setIsEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  // Save services to localStorage whenever services change
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const handleScrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddClick = () => {
    setIsAddingService(true);
    setIsEditingService(null);
  };

  const handleServiceAdded = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
    setIsAddingService(false);
  };

  const handleGoBack = () => {
    setIsAddingService(false);
    setIsEditingService(null);
  };

  const handleEditClick = (index) => {
    setIsEditingService(index);
    setIsAddingService(false);
  };

  const handleServiceUpdated = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service, index) =>
        index === isEditingService ? updatedService : service
      )
    );
    setIsEditingService(null);
  };

  const handleDeleteClick = (index) => {
    setServices((prevServices) => prevServices.filter((_, i) => i !== index));
  };

  const handleViewMoreClick = (service) => {
    setSelectedService(service);
  };

  const closeDialog = () => {
    setSelectedService(null);
  };

  return (
    <div className="container">
      {isAddingService ? (
        <AddService onServiceAdded={handleServiceAdded} goBack={handleGoBack} />
      ) : isEditingService !== null ? (
        <EditService
          service={services[isEditingService]}
          onServiceUpdated={handleServiceUpdated}
          goBack={handleGoBack}
        />
      ) : (
        <>
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Health Care</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => handleScrollTo(aboutRef)}>
                      About
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => handleScrollTo(servicesRef)}>
                      Services
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => handleScrollTo(contactRef)}>
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Featurette Section */}
          <div className="featurette-section text-white d-flex flex-column justify-content-center align-items-center" style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
            <div style={{ backgroundImage: `url('https://angelhomehealthcare.com/wp-content/uploads/2021/08/5-reasons-for-home-health-care-img.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}></div>
            <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}></div>
            <div className="content-container text-center" style={{ position: 'relative', zIndex: 3 }}>
              <h2 className="featurette-heading fw-normal lh-1 mb-3">
                Health Care Services,{' '}
                <span className=" greyLook" >wellness Well Served.</span>
              </h2>
              <p className="lead mb-4">It's Time for Health Care Services to move Online.</p>
              <button onClick={() => handleScrollTo(servicesRef)} className="btn btn-primary">Check Our Services</button>
            </div>
          </div>

          {/* About Section */}
          <About ref={aboutRef} />

          {/* Services Section */}
          <div ref={servicesRef} className="mt-5">
            <h2>Our Services</h2>
            <div className="top-right mb-3">
              <button onClick={handleAddClick} className="btn btn-success">Add New Service</button>
            </div>
            <div className="row">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                      <div className="container-fluid py-5">
                        <h3 className="display-6 fw-bold text-wrap">{service.name}</h3>
                        <p className="col-md-8 fs-5 text-wrap">{service.description}</p>
                        <p><strong>Price:</strong> ${service.price.toFixed(2)}</p>
                        <button onClick={() => handleEditClick(index)} className="btn btn-warning me-2">Edit</button>
                        <button onClick={() => handleDeleteClick(index)} className="btn btn-danger">Delete</button>
                        <button onClick={() => handleViewMoreClick(service)} className="btn btn-info m-2">View More</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No services available. Please add a new service.</p>
              )}
            </div>
          </div>

          {/* Contact Us Section */}
          <ContactUs ref={contactRef} />

          {/* Custom Dialog for Viewing More Description */}
          {selectedService && (
            <div className="custom-dialog-overlay" onClick={closeDialog}>
              <div className="custom-dialog" onClick={(e) => e.stopPropagation()}>
                <h5>{selectedService.name}</h5>
                <p>{selectedService.description}</p>
                <button className="btn btn-secondary" onClick={closeDialog}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceList;
