// ContactUs.js
import React from 'react';

const ContactUs = React.forwardRef((props, ref) => (
  <div ref={ref} className="contact-section p-5" style={{ backgroundColor: '#f8f9fa' }}>
    <h2>Contact Us</h2>
    <p>
      You can reach us at  +91 7891234567 or email us at info@healthcare.com for more information.
    </p>
  </div>
));

export default ContactUs;
