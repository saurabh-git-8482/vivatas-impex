import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./ProductCard.css";

function ProductCard({ product }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [images, setImages] = useState([]); // <-- Multiple images
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  /* ================= IMAGE FETCH ================= */
  useEffect(() => {
    if (product?._id) loadImages();
  }, [product?._id]);

  const loadImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/product-images`, {
        params: { productId: product._id },
      });
      const imgs = res.data?.data?.map((imgObj) => imgObj.image) || [];
      setImages(imgs);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ATTR HELPERS ================= */
  const getAttr = (key) =>
    product.attributes?.find((a) => a.attributeKey === key)?.values?.[0];

  const title = getAttr("title") || "Product";
  const description = truncateText(getAttr("description"), 14);
  const usage = getAttr("usage");

  /* ================= NAVIGATION ================= */
  const handleGetQuote = () => {
    navigate("/contact", {
      state: {
        productId: product._id,
        productTitle: title,
      },
    });
  };

  const capitalizeFirst = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);

  /* ================= UI ================= */
  return (
    <>
      <div className="product-card">
        {/* IMAGE */}
        <div
          className="product-image"
          onClick={() => {
            if (images.length > 0) {
              setSelectedImg(images[0]); // Show first image in modal
              setShow(true);
            }
          }}
          style={{ cursor: images.length > 0 ? "pointer" : "default" }}
        >
          {loading ? (
            <div className="img-placeholder">Loading...</div>
          ) : images.length > 0 ? (
            <img src={images[0]} alt={title} />
          ) : (
            <div className="img-placeholder">No Image</div>
          )}
        </div>

        {/* CONTENT */}
        <div className="product-content">
          <h5 className="product-title">{title}</h5>
          <p className="product-desc">{description}</p>

          {usage && (
            <div className="product-usage">
              <strong>Usage:</strong> {usage}
            </div>
          )}

          <div className="product-attrs">
            {product.attributes
              ?.filter(
                (a) =>
                  !["title", "description", "usage"].includes(a.attributeKey)
              )
              .map((attr) =>
                attr.values.map((val, idx) => (
                  <span key={idx} className="attr-chip">
                    {capitalizeFirst(attr.attributeKey)}: {val}
                  </span>
                ))
              )}
          </div>

          {/* GET QUOTE BUTTON */}
          <div className="product-cta">
            <button className="quote-btn" onClick={handleGetQuote}>
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={title} className="w-100 mb-2" />
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductCard;

/* ================= HELPERS ================= */
function truncateText(text, wordLimit = 12) {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
}
