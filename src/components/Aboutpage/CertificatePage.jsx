



import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

// Import environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);

        // Validate environment variables first
        if (!API_BASE_URL || !DOMAIN_NAME) {
          console.error("Missing environment variables!");
          console.error("API_BASE_URL:", API_BASE_URL);
          console.error("DOMAIN_NAME:", DOMAIN_NAME);
          throw new Error("Configuration error: Missing API URL or domain name");
        }

        console.log("API_BASE_URL:", API_BASE_URL);
        console.log("DOMAIN_NAME:", DOMAIN_NAME);

        // Try multiple endpoint variations using only env variables
        const endpoints = [
          `${API_BASE_URL}/certificates?domainName=${DOMAIN_NAME}`,
          `${API_BASE_URL}/certificates?domainName=${DOMAIN_NAME}`,
        ];

        let data = null;
        let successUrl = null;

        // Try each endpoint until one works
        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            const response = await fetch(endpoint);

            if (response.ok) {
              data = await response.json();
              successUrl = endpoint;
              console.log(`✓ Success with: ${endpoint}`);
              console.log("Response data:", data);
              break;
            } else {
              console.log(`✗ Failed (${response.status}): ${endpoint}`);
            }
          } catch (err) {
            console.log(`✗ Error with ${endpoint}:`, err.message);
            continue;
          }
        }

        if (!data) {
          throw new Error(
            "Could not fetch certificates from any endpoint. Please check:\n" +
            "1. API is running and accessible\n" +
            "2. Domain name is correct\n" +
            "3. Endpoint path matches backend routes"
          );
        }

        console.log("Using endpoint:", successUrl);

        // Handle different response structures
        let certificatesArray = [];

        if (Array.isArray(data)) {
          certificatesArray = data;
        } else if (data.data && Array.isArray(data.data)) {
          certificatesArray = data.data;
        } else if (data.certificates && Array.isArray(data.certificates)) {
          certificatesArray = data.certificates;
        } else if (data.success && data.data && Array.isArray(data.data)) {
          certificatesArray = data.data;
        } else if (data.certificate) {
          // Single certificate object
          certificatesArray = [data.certificate];
        } else {
          console.warn("Unexpected response structure:", data);
          certificatesArray = [];
        }

        console.log("Extracted certificates array:", certificatesArray);

        if (certificatesArray.length === 0) {
          console.warn("No certificates found in response");
          setCertificates([]);
          setError(null);
          setLoading(false);
          return;
        }

        // Map API response to component format
        const formattedCertificates = certificatesArray.map((cert, index) => ({
          id: cert._id || cert.id || `cert-${index + 1}`,
          title: cert.certificateTitle || cert.title || "Certificate",
          image: cert.certificateImage || cert.image,
          issueDate: cert.issueDate || cert.createdAt,
        }));

        console.log("Formatted certificates:", formattedCertificates);

        // Validate that certificates have images
        const validCertificates = formattedCertificates.filter(cert => cert.image);
        
        if (validCertificates.length === 0) {
          console.warn("No certificates with valid images found");
        }

        setCertificates(validCertificates);
        setError(null);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const openModal = (img, t) => {
    setSelectedImg(img);
    setTitle(t);
    setShow(true);
  };

  if (loading) {
    return (
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              {/* <span className="visually-hidden">Loading...</span> */}
            </div>
            {/* <p className="mt-3 text-muted">Loading certificates...</p> */}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <div className="container">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold">Certificates</h2>
            <p className="text-muted mb-0">
              Recognitions and certifications that validate our expertise
            </p>
          </div>
          <div className="text-center py-5">
            <div className="alert alert-danger d-inline-block" role="alert">
              <strong>Error loading certificates</strong>
              <p className="mb-0 mt-2 small text-start">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!certificates || certificates.length === 0) {
    return (
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <div className="container">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold">Certificates</h2>
            <p className="text-muted mb-0">
              Recognitions and certifications that validate our expertise
            </p>
          </div>
          <div className="text-center py-5">
            <p className="text-muted">No certificates available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
      <div className="container">
        {/* ===== Header ===== */}
        <div className="text-center mb-4 mb-md-5">
          <h2 className="fw-bold">Certificates</h2>
          <p className="text-muted mb-0">
            Recognitions and certifications that validate our expertise
          </p>
        </div>

        {/* ===== Certificate Grid ===== */}
        <div className="row g-4">
          {certificates.map((item) => (
            <div
              key={item.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div
                className="card h-100 border-0 shadow-sm text-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#FFFEF2",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onClick={() => openModal(item.image, item.title)}
                onMouseEnter={(e) => {
                  if (window.innerWidth >= 768) {
                    e.currentTarget.style.transform = "scale(1.04)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0,0,0,0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="p-3 d-flex align-items-center justify-content-center"
                  style={{ minHeight: "200px" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{
                      maxHeight: "160px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", item.image);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                <div className="card-body pt-0">
                  <h6 className="fw-semibold mb-1 fs-6 fs-md-5">
                    {item.title}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Modal ===== */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="xl"
        fullscreen="md-down"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fs-md-5">
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center p-3">
          {selectedImg && (
            <img
              src={selectedImg}
              alt={title}
              className="img-fluid"
              style={{
                maxHeight: "80vh",
                width: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Certificates;