import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

// Fallback/local certificate
import cert1 from "../../assets/certificates/cert5.jpg";

const fallbackCertificates = [
  {
    id: 1,
    title: "Udyam Registration Certificate",
    image: cert1,
  },
];

const Certificates = () => {
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (img, t) => {
    setSelectedImg(img);
    setTitle(t);
    setShow(true);
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/api/certificates");
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        if (Array.isArray(data) && data.length) {
          setCertificates(data);
        }
      } catch (err) {
        console.error("Using fallback certificates", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-4 mb-md-5">
          <h2 className="fw-bold">Certificates</h2>
          <p className="text-muted mb-0 fs-6 fs-md-5">
            Recognitions and certifications that validate our expertise
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {/* Grid */}
        <div className="row g-3 g-md-4">
          {certificates.map((item) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={item.id}
            >
              <div
                className="card h-100 border-0 shadow-sm text-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#F6F5E8",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onClick={() => openModal(item.image, item.title)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="p-3 d-flex align-items-center justify-content-center" style={{ minHeight: 200 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{ maxHeight: 180, objectFit: "contain" }}
                  />
                </div>
                <div className="card-body pt-0">
                  <h6 className="fw-semibold mb-1">{item.title}</h6>
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={`${item.title} logo`}
                      className="img-fluid"
                      style={{ height: 36 }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fs-md-5">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2 p-md-3 text-center">
          {selectedImg && (
            <img
              src={selectedImg}
              alt={title}
              className="img-fluid"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Certificates;
