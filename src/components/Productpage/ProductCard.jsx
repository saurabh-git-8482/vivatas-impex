import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Carousel } from "react-bootstrap";
import "./ProductCard.css";

function ProductCard({ product }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ================= CLEAN YOUTUBE EMBED URL =================
  const cleanEmbedUrl = (url) => {
    if (!url) return null;
    return url.split("?")[0];
  };

  // ================= YOUTUBE ID =================
  const getYoutubeId = (embedUrl) =>
    embedUrl?.includes("embed/")
      ? embedUrl.split("embed/")[1]?.split("?")[0]
      : null;

  // ================= YOUTUBE THUMBNAIL =================
  const getYoutubeThumbnail = (embedUrl) => {
    const id = getYoutubeId(embedUrl);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  };

  // ================= LOAD MEDIA =================
  useEffect(() => {
    if (!product?._id) return;

    const loadMedia = async () => {
      try {
        const [imgRes, vidRes] = await Promise.all([
          axios.get(`${baseURL}/product-images`, {
            params: { productId: product._id },
          }),
          axios.get(`${baseURL}/product-videos`, {
            params: { productId: product._id },
          }),
        ]);

        setImages(imgRes.data?.data?.map((i) => i.image).filter(Boolean) || []);

        setVideos(
          vidRes.data?.data
            ?.map((v) => cleanEmbedUrl(v.iframeUrl))
            .filter(Boolean) || [],
        );
      } catch (err) {
        console.error("Error loading media:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [product?._id]);

  // ================= COMBINE MEDIA =================
  const media = [
    ...images.map((img) => ({ type: "image", src: img })),
    ...videos.map((vid) => ({
      type: "video",
      src: vid,
      thumbnail: getYoutubeThumbnail(vid),
    })),
  ];

  // ================= ATTRIBUTES =================
  const getAttr = (key) =>
    product.attributes?.find((a) => a.attributeKey === key)?.values?.[0];

  const truncateText = (text, limit = 14) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  const capitalizeFirst = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const title = getAttr("title") || "Product";
  const description = truncateText(getAttr("description"));
  const usage = getAttr("usage");

  // ================= ACTIONS =================
  const handleGetQuote = () => {
    navigate("/contact", {
      state: { productId: product._id, productTitle: title },
    });
  };

  const handleClose = () => {
    setShow(false);
    setActiveIndex(0);
  };

  // ================= FIRST MEDIA PREVIEW =================
  const renderFirstMedia = () => {
    if (loading) return <div className="img-placeholder">Loading...</div>;
    if (!media.length) return <div className="img-placeholder">No Media</div>;

    const first = media[0];

    if (first.type === "image") {
      return <img src={first.src} alt={title} />;
    }

    return (
      <div className="video-thumbnail-wrapper">
        <img src={first.thumbnail} alt={title} />
        <div className="play-overlay">
          <div className="play-button">▶</div>
        </div>
      </div>
    );
  };

  // ================= RENDER =================
  return (
    <>
      <div className="product-card">
        <div
          className="product-image"
          style={{ cursor: media.length ? "pointer" : "default" }}
          onClick={() => media.length && setShow(true)}
        >
          {renderFirstMedia()}
        </div>

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
                  !["title", "description", "usage"].includes(a.attributeKey),
              )
              .map((attr) =>
                attr.values.map((val, i) => (
                  <span key={i} className="attr-chip">
                    {capitalizeFirst(attr.attributeKey)}: {val}
                  </span>
                )),
              )}
          </div>

          <div className="product-cta">
            <button className="quote-btn" onClick={handleGetQuote}>
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          <Carousel
            activeIndex={activeIndex}
            onSelect={(i) => setActiveIndex(i)}
            interval={null}
            slide={false}
            indicators={media.length > 1}
            controls={media.length > 1}
          >
            {media.map((item, idx) => (
              <Carousel.Item key={idx}>
                <div className="carousel-media">
                  {item.type === "image" ? (
                    <img src={item.src} alt={title} />
                  ) : (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "17 / 9",
                        backgroundColor: "#000",
                      }}
                    >
                      {activeIndex === idx ? (
                        <iframe
                          src={`${item.src}?autoplay=1`}
                          title={`Product Video ${idx + 1}`}
                          frameBorder="0"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        <img
                          src={item.thumbnail}
                          alt="video thumbnail"
                          className="d-block w-100"
                        />
                      )}
                    </div>
                  )}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductCard;
