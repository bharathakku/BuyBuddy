import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000' }} className="text-light pt-5 pb-3 mt-5 border-top border-secondary">
      <div className="container">
        <div className="row text-start">

          {/* ABOUT */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#1C69D4' }}>BuyBuddy</h5>
            <ul className="list-unstyled">
              {['About Us', 'Contact', 'Careers', 'Press'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-light text-decoration-none d-block py-1 footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#1C69D4' }}>Help</h5>
            <ul className="list-unstyled">
              {['Payments', 'Shipping', 'Cancellation', 'FAQ'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-light text-decoration-none d-block py-1 footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* POLICY */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#1C69D4' }}>Policy</h5>
            <ul className="list-unstyled">
              {['Return Policy', 'Terms of Use', 'Security', 'Privacy'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-light text-decoration-none d-block py-1 footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL & CONTACT */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#1C69D4' }}>Connect</h5>
            <div className="d-flex gap-3 mb-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="d-inline-flex align-items-center justify-content-center border border-primary text-primary rounded-circle"
                  style={{
                    width: 36,
                    height: 36,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1C69D4';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1C69D4';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="small mb-1">📧 support@buybuddy.com</p>
            <p className="small mb-0">📞 +91-12345-67890</p>
          </div>
        </div>

        <hr className="border-secondary opacity-25" />
        <div className="text-center small text-light opacity-50">
          &copy; {new Date().getFullYear()} BuyBuddy. Inspired by BMW. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
