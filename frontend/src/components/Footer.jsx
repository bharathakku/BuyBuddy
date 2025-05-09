import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-start">
          {/* ABOUT */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase mb-3">BuyBuddy</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-light text-decoration-none">Press</a></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase mb-3">Help</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Payments</a></li>
              <li><a href="#" className="text-light text-decoration-none">Shipping</a></li>
              <li><a href="#" className="text-light text-decoration-none">Cancellation</a></li>
              <li><a href="#" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </div>

          {/* POLICY */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase mb-3">Policy</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Return Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Terms of Use</a></li>
              <li><a href="#" className="text-light text-decoration-none">Security</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy</a></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="text-uppercase mb-3">Connect</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><FaFacebookF /></a>
              <a href="#" className="text-light"><FaTwitter /></a>
              <a href="#" className="text-light"><FaInstagram /></a>
              <a href="#" className="text-light"><FaYoutube /></a>
            </div>
            <div className="mt-3">
              <p className="small mb-0">Email: support@buybuddy.com</p>
              <p className="small mb-0">Phone: +91-12345-67890</p>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center small">
          &copy; {new Date().getFullYear()} BuyBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
