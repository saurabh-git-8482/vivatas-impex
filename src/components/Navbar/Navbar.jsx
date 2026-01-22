import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import lg from "../../assets/logo.png";
import "./Navbar.css";
import LanguageSwitcher from "../LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const domainName = import.meta.env.VITE_DOMAIN_NAME;

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/categories`, {
        params: { domainName },
      });
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error("Navbar category error:", err);
    }
  };

  /* ================= HANDLERS ================= */
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsProductOpen(false);
  };

  const toggleProducts = () => {
    setIsProductOpen((prev) => !prev);
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (window.innerWidth <= 1024) {
      setIsMenuOpen(false);
      setIsProductOpen(false);
    }
  };

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

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm custom-navbar"
      style={{ backgroundColor: "#FFFEF2" }}
    >
      <div className="container">
        {/* LOGO */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img src={lg} alt="Vivatas Impex Logo" className="navbar-logo" />
        </NavLink>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* MENU */}
        <div
          id="nav"
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 text-center">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link fw-bold"
                onClick={() => handleNavClick("/")}
              >
                HOME
              </NavLink>
            </li>

            {/* ===== ABOUT DROPDOWN ===== */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle fw-bold"
                role="button"
                onClick={() => setIsProductOpen(false)}
                data-bs-toggle="dropdown"
              >
                ABOUT
              </span>

              <ul className="dropdown-menu shadow-sm border-0">
                <li>
                  <NavLink
                    to="/about"
                    className="dropdown-item"
                    onClick={() => handleNavClick("/about")}
                  >
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/certificates"
                    className="dropdown-item"
                    onClick={() => handleNavClick("/certificates")}
                  >
                    Certificates
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* ===== PRODUCTS DROPDOWN ===== */}
            <li className={`nav-item dropdown ${isProductOpen ? "show" : ""}`}>
              <span
                className="nav-link dropdown-toggle fw-bold"
                role="button"
                onClick={toggleProducts}
              >
                PRODUCTS
              </span>
              <ul
                className={`dropdown-menu shadow-sm border-0 ${
                  isProductOpen ? "show" : ""
                }`}
              >
                {categories.map((cat) => {
                  const categorySlug =
                    cat.slug || cat.name?.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <li key={cat._id}>
                      <NavLink
                        to={`/products/${categorySlug}`}
                        className="dropdown-item"
                        onClick={() => {
                          handleNavClick(`/products/${categorySlug}`);
                          setIsProductOpen(false); // ✅ CLOSE DROPDOWN ON CLICK
                        }}
                      >
                        {cat.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* <li className="nav-item">
              <NavLink
                to="/gallery"
                className="nav-link fw-bold"
                onClick={() => handleNavClick("/gallery")}
              >
                GALLERY
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/blog"
                className="nav-link fw-bold"
                onClick={() => handleNavClick("/blog")}
              >
                BLOG
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/global-reach"
                className="nav-link fw-bold"
                onClick={() => handleNavClick("/global-reach")}
              >
                GLOBAL REACH
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-link fw-bold"
                onClick={() => handleNavClick("/contact")}
              >
                CONTACT
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2">
              <a
                href={`tel:${contactData.phone}`}
                className="btn btn-outline-danger px-1 py-0 fw-bold"
              >
                CALL NOW
              </a>
            </li>
            <li className="nav-item d-flex align-items-center p-1 ">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
