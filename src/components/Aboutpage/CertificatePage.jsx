import { useState } from "react";
import { Modal } from "react-bootstrap";

import cert1 from "../../assets/certificates/cert1.jpg";


const certificates = [
  {
    id: 1,
    title: "Startup India Recognition",
    image: cert1,
  },
 
];

const Certificates = () => {
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (img, title) => {
    setSelectedImg(img);
    setTitle(title);
    setShow(true);
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#FFFEF2" }}>
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Certificates</h2>
          <p className="text-muted">
            We comply with national and international certification standards.
          </p>
        </div>

        {/* GRID */}
        <div className="row g-4">
          {certificates.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <div
                className="card h-100 shadow-sm border-0 text-center certificate-card"
                onClick={() => openModal(item.image, item.title)}
                style={{ cursor: "pointer" }}
              >
                <div className="p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{ maxHeight: "260px", objectFit: "contain" }}
                  />
                </div>

                <div className="pb-3">
                  <h6 className="fw-semibold">{item.title}</h6>

                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={item.title}
                      style={{ height: "36px", marginTop: "8px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL (ONE TIME ONLY) */}
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
