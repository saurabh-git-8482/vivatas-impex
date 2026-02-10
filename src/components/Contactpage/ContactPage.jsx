import { useState } from "react";
import axios from "axios";
import { useContactData } from "../../context/ContactContext";
import contactImg from "../../assets/ContactPage/image.png";

const ContactPage = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // ✅ GLOBAL CONTACT DATA (FROM CONTEXT)
  const contactData = useContactData();

  // ✅ SAFE DESTRUCTURING
  const { pageTitle, address, phone, email, description, timing } =
    contactData || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    country: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/contact`, {
        ...formData,
        domainName: "vivatasimpex.com",
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        product: "",
        country: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Something went wrong ❌ Please try again.");
    }
  };

  const socialLinks = {
    facebook: "https://www.facebook.com/share/1Aef1z1xJw/",
    instagram: "https://www.instagram.com/vivatasimpex?igsh=dThneWNmM2w2aXNp",
    youtube: "https://www.youtube.com/@vivatasimpex",
    whatsapp: "https://wa.me/9175861356",
    linkedin: "http://www.linkedin.com/in/vivatas-impex",
  };

  return (
    <>
      {/* ================= SUPPLIERS SECTION ================= */}
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="fw-bold" style={{ color: "#222222" }}>
              Suppliers
            </h1>
            <div
              style={{
                width: "80px",
                height: "3px",
                backgroundColor: "#C81D25",
                margin: "10px auto",
              }}
            />
          </div>

          <div className="row align-items-center g-4">
            <div className="col-12 col-md-6">
              <p style={{ color: "#6B6B6B", lineHeight: "1.8" }}>
                As merchant exporters, <strong>Vivatas Impex</strong> partners
                with manufacturers of export-quality products to help them reach
                global markets. We promote your products and brand across
                international geographies where demand exists.
              </p>

              <p style={{ color: "#6B6B6B", lineHeight: "1.8" }}>
                By acting as your international representative, we simplify
                market entry, expand your reach, and support long-term business
                growth. Share your product details with us and let our team
                handle global opportunities for you.
              </p>

              <p style={{ color: "#6B6B6B", lineHeight: "1.8" }}>
                We believe in building strong, long-term partnerships. At
                Vivatas Impex, we work with our suppliers as{" "}
                <span style={{ color: "#C81D25", fontWeight: "600" }}>
                  “Partners in Progress”
                </span>{" "}
                and help them scale sustainably in international markets.
              </p>

              <p className="fw-bold mt-3" style={{ color: "#222222" }}>
                Make <span style={{ color: "#C81D25" }}>Vivatas Impex</span> your
                trusted export partner.
              </p>
            </div>

            <div className="col-12 col-md-6 text-center">
              <img
                src={contactImg}
                alt="Global Supplier Network"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <div className="container px-3 px-md-0">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="fw-bold">{pageTitle || "Contact Us"}</h2>
            <p className="text-muted">{address}</p>
          </div>

          <div className="row g-4">
            {/* LEFT CARD */}
            <div className="col-12 col-md-5">
              <div className="card shadow-sm h-100" style={{ backgroundColor: "#F6F5E8" }}>
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Vivatas Impex</h5>

                  <p>{description}</p>
                  <p>📞 {phone}</p>
                  <p>✉️ {email}</p>
                  <p>{timing}</p>
                  <div className="d-flex gap-3 mt-3">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="fs-4"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-danger fs-4"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="text-danger fs-4"
                  >
                    <i className="bi bi-youtube"></i>
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="fs-4"
                    style={{ color: "#1DAA61" }}
                  >
                    <i className="bi bi-whatsapp"></i>
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="fs-4"
                    style={{ color: "#0D6EFD" }}
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>

                  {/* <div className="d-flex gap-3 mt-3">
                    {Object.entries(socialLinks).map(([key, link]) => (
                      <a
                        key={key}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="fs-4"
                      >
                        <i className={`bi bi-${key}`}></i>
                      </a>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-12 col-md-7">
              <div className="card shadow-sm" style={{ backgroundColor: "#F6F5E8" }}>
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Send Us an Enquiry</h5>

                  {success && (
                    <div className="alert alert-success">
                      Your enquiry has been submitted successfully!
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Mobile / WhatsApp Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="product"
                        className="form-control"
                        placeholder="Product Interested In"
                        required
                        value={formData.product}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        placeholder="Country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        name="message"
                        className="form-control"
                        rows="4"
                        placeholder="Your Message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-danger w-100">
                        Submit Enquiry
                      </button>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}
          {address && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="card shadow-sm">
                  <iframe
                    title="Location Map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      address
                    )}&output=embed`}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactPage;
