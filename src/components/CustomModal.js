// CustomModal.js
import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5>{service.name}</h5>
          <button onClick={onClose} className="close-button">✖</button>
        </div>
        <div className="custom-modal-body">
          <p>{service.description}</p>
        </div>
        <div className="custom-modal-footer">
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
