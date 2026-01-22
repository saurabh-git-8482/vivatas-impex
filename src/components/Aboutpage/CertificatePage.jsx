import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

// Fallback/local certificate (optional)
import cert1 from "../../assets/certificates/cert1.jpg";

const fallbackCertificates = [
  {
    id: 1,
    title: "Startup India Recognition",
    image: cert1,
  },
];

const Certificates = () => {
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (img, title) => {
    setSelectedImg(img);
    setTitle(title);
    setShow(true);
  };

  // Fetch certificates from backend (optional)
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/api/certificates");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (Array.isArray(data) && data.length) {
          setCertificates(data);
        }
      } catch (error) {
        console.error("Failed to fetch certificates, using fallback", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
      <div className="container">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Certificates</h2>
          <p className="text-muted mb-0">
            Recognitions and certifications that validate our expertise
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center">
            <p>Loading certificates...</p>
          </div>
        )}

        {/* GRID */}
        <div className="row g-4">
          {certificates.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <div
                className="card h-100 border-0 shadow-sm text-center certificate-card"
                onClick={() => openModal(item.image, item.title)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#F6F5E8", // 🎨 CARD BACKGROUND COLOR
                  // transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div className="p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{ maxHeight: "220px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body pt-0">
                  <h6 className="fw-semibold mb-0">{item.title}</h6>
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={`${item.title} logo`}
                      style={{ height: "36px", marginTop: "8px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {selectedImg && <img src={selectedImg} alt={title} className="w-100" />}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Certificates;