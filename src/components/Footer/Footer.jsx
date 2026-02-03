import { Link } from "react-router-dom";
import lg from "../../assets/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./Footer.css"; // Import custom CSS for Footer
import { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/contact-page`, {
          params: {
            domainName: "vivatasimpex.com",
          },
        });
        setContactData(res.data);
      } catch (err) {
        console.error("Error loading contact page data:", err);
      }
    };

    fetchData();
  }, []);

  if (!contactData) return <div>Loading…</div>;
  const socialLinks = {
    facebook:
      "https://www.facebook.com/people/Vivatas-Impex/pfbid02NVgJxJNC887uW2idQd1ZDsdxcYTUGF3NZwFyXA92DF7K7qkSEa31jW2foWqM1g8sl/",
    instagram: "https://www.instagram.com/vivatasimpex?igsh=dThneWNmM2w2aXNp",
    youtube: "https://www.youtube.com/@vivatasimpex",
    whatsapp: `https://wa.me/${contactData.phone}`,

    linkedin: "http://www.linkedin.com/in/vivatas-impex",
  };

  return (
    <footer className="pt-5  " style={{ backgroundColor: "#1A1A1A" }}>
      <div className="container text-light">
        <div className="row text-center text-md-start">
          {/* COMPANY INFO */}
          {/* COMPANY INFO */}
          <div className="col-12 col-lg-4 mb-5 text-center text-lg-start">
            <Link to="/" className="d-inline-block mb-3">
              <img src={lg} alt="Vivatas Impex Logo" className="Footer-logo" />
            </Link>
            <p className="small text-light footer-summary">
              Vivatas Impex is a premium import-export and trading company
              connecting India’s finest products with global markets.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-6 col-md-4 col-lg-2 mb-4 ">
            <h6 className="fw-bold text-danger">QUICK LINKS</h6>
            <ul className="list-unstyled mt-3 small mb-0 ">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-light text-decoration-none"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  to="/products/artisan-handwoven-carpets"
                  className="text-light text-decoration-none"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-light text-decoration-none">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link to="/gallery" className="text-light text-decoration-none">
                  Gallary
                </Link>
              </li> */}
            </ul>
          </div>

          {/* PRODUCTS */}
          <div className="col-6 col-md-4 col-lg-3 mb-4">
            <h6 className="fw-bold text-danger">OUR PRODUCTS</h6>
            <ul className="list-unstyled mt-3 small ">
              <li>Frozen Sweet Corn</li>
              <li>Frozen Green Peas</li>
              <li>Dry Onion</li>
              <li>Dry Onion Powder</li>
              <li>Handmade Carpet</li>
              <li> Luxurious Indian Marble</li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h6 className="fw-bold text-danger">CONTACT US</h6>
            <ul className="list-unstyled mt-3 small">
              <li className="mb-1">
                📍HEAD OFFICE : f 01 umbarda bazar nearby zp school main road
                subdistrict:- karanja lad district washim, pin 444105
              </li>
              <li> {contactData.description}</li>

              <li className="mb-1">
                📞{" "}
                <a
                  href={`tel:${contactData.phone}`}
                  className="text-light text-decoration-none"
                >
                  {contactData.phone}
                </a>
              </li>

              <li className="mb-1">
                ✉️{" "}
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-light text-decoration-none"
                >
                  {contactData.email}
                </a>
              </li>
              {/* <p>⏰ {contactData.timing}</p> */}
            </ul>

            {/* SOCIAL ICONS */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              {Object.entries(socialLinks).map(([key, link]) => (
                <a
                  key={key}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text- fs-4"
                >
                  <i className={`bi bi-${key} social-icon ${key}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-top border-secondary  pt-3 pb-3 text-center">
          <small>
            © {new Date().getFullYear()} Vivatas Impex. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
