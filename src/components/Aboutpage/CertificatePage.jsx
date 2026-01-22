import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (img, title) => {
    setSelectedImg(img);
    setTitle(title);
    setShow(true);
  };

  // 🔹 Fetch certificates from backend
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(
          "https://your-backend-api.com/api/certificates"
        );

        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error("Failed to fetch certificates", error);
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
          <p className="text-muted">
            We comply with national and international certification standards.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center">
            <p>Loading certificates...</p>
          </div>
        )}

        {/* GRID */}
        <div className="row g-5">
          {certificates.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card certificate-structure border-0 shadow-sm h-100"
                onClick={() => openModal(item.image, item.title)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                />

                <div className="card-body text-center">
                  <h6 className="fw-semibold mb-0">{item.title}</h6>
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
          {selectedImg && (
            <img src={selectedImg} alt={title} className="w-100" />
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Certificates;
