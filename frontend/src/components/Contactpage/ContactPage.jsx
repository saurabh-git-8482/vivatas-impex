import { useEffect, useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    country: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [contactData, setContactData] = useState(null);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/contact/submit`, {
        ...formData,
        domain: "vivatasimpex.com",
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

  /* ================= CONTACT PAGE API ================= */
  useEffect(() => {
    const fetchContactPage = async () => {
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

    fetchContactPage();
  }, []);

  const socialLinks = {
    facebook: "https://www.facebook.com/vivatasimpex",
    instagram: "https://www.instagram.com/vivatas_impex/",
    youtube: "https://www.youtube.com/@vivatasimpex",
    whatsapp: "https://wa.me/919763605135",
  };

  if (!contactData) return <div className="text-center py-5">Loading...</div>;

  return (
    <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
      <div className="container px-3 px-md-0">

        {/* PAGE TITLE */}
        <div className="text-center mb-4 mb-md-5">
          <h2 className="fw-bold">{contactData.pageTitle || "Contact Us"}</h2>
          <p className="text-muted">{contactData.description}</p>
        </div>

        <div className="row g-4">

          {/* ================= LEFT CARD (UNCHANGED UI) ================= */}
          <div className="col-12 col-md-5">
            <div className="card shadow-sm h-100" style={{ backgroundColor: "#F6F5E8" }}>
              <div className="card-body">
                <h5 className="fw-bold mb-3">Vivatas Impex</h5>

                <p>{contactData.description}</p>

                <p>📞 {contactData.phone}</p>
                <p>✉️ {contactData.email}</p>
                <p>⏰ {contactData.timing}</p>

                <div className="d-flex gap-3 mt-3">
                  <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="fs-4">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-danger fs-4">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="text-danger fs-4">
                    <i className="bi bi-youtube"></i>
                  </a>
                  <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="fs-4" style={{ color: "#1DAA61" }}>
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT FORM (UNCHANGED UI) ================= */}
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
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <iframe
                title="Vivatas Impex Location"
                src="https://www.google.com/maps?q=F01+Umbarda+Bazar+Near+ZP+School+Main+Road&output=embed"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;
