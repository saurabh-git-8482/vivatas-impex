import { useState } from "react";
import { Modal } from "react-bootstrap";

import cert1 from "../../assets/certificates/cert2.jpg";
// import cert2 from "../../assets/certificates/cert5.jpg";


const certificates = [
  {
    id: 1,
    title: "Udyam Registration Certificate",
    image: cert1,
  },
  // Add more certificates here when needed
  // {
  //   id: 2,
  //   title: "ISO Certification",
  //   image: cert2,
  // },
];

const Certificates = () => {
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (img, t) => {
    setSelectedImg(img);
    setTitle(t);
    setShow(true);
  };

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
