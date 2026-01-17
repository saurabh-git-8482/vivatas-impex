// // ProductCard.jsx - Updated to match your API setup
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Modal, Carousel } from "react-bootstrap";
// import "./ProductCard.css";

// function ProductCard({ product }) {
//   const baseURL = import.meta.env.VITE_API_BASE_URL;
//   const navigate = useNavigate();

//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [show, setShow] = useState(false);
//   const [videos, setVideos] = useState([]);

//   // ================= YOUTUBE URL CONVERTER =================
//   // const convertToEmbedUrl = (url) => {
//   //   if (!url) return url;
    
//   //   // Handle youtube.com/watch?v=VIDEO_ID
//   //   if (url.includes("youtube.com/watch?v=")) {
//   //     const videoId = url.split("watch?v=")[1]?.split("&")[0];
//   //     return `https://www.youtube.com/embed/${videoId}`;
//   //   }
    
//   //   // Handle youtu.be/VIDEO_ID
//   //   if (url.includes("youtu.be/")) {
//   //     const videoId = url.split("youtu.be/")[1]?.split("?")[0];
//   //     return `https://www.youtube.com/embed/${videoId}`;
//   //   }
    
//   //   // Already an embed URL or other video format
//   //   return url;
//   // };

// const convertToEmbedUrl = (url) => {
//   if (!url) return null;

//   let videoId = null;

//   if (url.includes("youtube.com/watch")) {
//     videoId = new URL(url).searchParams.get("v");
//   } else if (url.includes("youtu.be")) {
//     videoId = url.split("youtu.be/")[1]?.split("?")[0];
//   }

//   return videoId
//   ? `https://www.youtube.com/embed/${videoId}?rel=0`
//   : url;
// };


//   // ================= GET YOUTUBE THUMBNAIL =================
//   const getYoutubeThumbnail = (url) => {
//     const embedUrl = convertToEmbedUrl(url);
//     if (!embedUrl?.includes("youtube.com/embed/")) return null;
//     const videoId = embedUrl.split("embed/")[1]?.split("?")[0];
//     return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
//   };

//   // ================= LOAD VIDEOS FROM API =================
//   const loadVideos = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/product-videos`, {
//         params: { productId: product._id },
//       });
      
//       console.log("Videos API response:", res.data); // Debug log
//       console.log("FULL VIDEO OBJECT:", res.data.data[0]);

//       // Convert all YouTube URLs to embed format
//       const vids = res.data?.data?.map((v) => convertToEmbedUrl(v.video)) || [];
//       setVideos(vids);
//     } catch (err) {
//       console.error("Error loading videos:", err);
//       setVideos([]);
//     }
//   };

//   // ================= LOAD IMAGES FROM API =================
//   // const loadImages = async () => {
//   //   try {
//   //     const res = await axios.get(`${baseURL}/product-images`, {
//   //       params: { productId: product._id },
//   //     });
      
//   //     console.log("Images API response:", res.data); // Debug log
      
//   //     const imgs = res.data?.data?.map((imgObj) => imgObj.image) || [];
//   //     setImages(imgs);
//   //   } catch (err) {
//   //     console.error("Error loading images:", err);
//   //     setImages([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }


//   // };


//   const loadImages = async () => {
//   try {
//     const res = await axios.get(`${baseURL}/product-images`, {
//       params: { productId: product._id },
//     });

//     console.log("Images API response:", res.data);

//     const imgs =
//       res.data?.data?.map((imgObj) => imgObj.image).filter(Boolean) || [];

//     setImages(imgs);
//   } catch (err) {
//     console.error("Error loading images:", err);
//     setImages([]);
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     if (product?._id) {
//       loadImages();
//       loadVideos();
//     }
//   }, [product?._id]);

//   // ================= COMBINE MEDIA (IMAGES FIRST, THEN VIDEOS) =================
//   const media = [
//     ...images.map((i) => ({ type: "image", src: i })),
//     ...videos.map((v) => ({ 
//       type: "video", 
//       src: v,
//       thumbnail: getYoutubeThumbnail(v)
//     })),
//   ];

//   console.log("Combined media:", media); // Debug log

//   // ================= HELPER FUNCTIONS =================
//   const getAttr = (key) =>
//     product.attributes?.find((a) => a.attributeKey === key)?.values?.[0];

//   const truncateText = (text, wordLimit = 12) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     return words.length > wordLimit
//       ? words.slice(0, wordLimit).join(" ") + "..."
//       : text;
//   };

//   const capitalizeFirst = (str = "") =>
//     str.charAt(0).toUpperCase() + str.slice(1);

//   const title = getAttr("title") || "Product";
//   const description = truncateText(getAttr("description"), 14);
//   const usage = getAttr("usage");

//   // ================= NAVIGATION =================
//   const handleGetQuote = () => {
//     navigate("/contact", {
//       state: {
//         productId: product._id,
//         productTitle: title,
//       },
//     });
//   };

//   const handleClose = () => {
//   setShow(false);
//   setVideos((prev) => [...prev]); // reset iframe
// };


//   // ================= RENDER FIRST MEDIA =================
//   const renderFirstMedia = () => {
//     if (loading) {
//       return <div className="img-placeholder">Loading...</div>;
//     }

//     if (!media.length) {
//       return <div className="img-placeholder">No Media</div>;
//     }

//     const firstItem = media[0];

//     if (firstItem.type === "image") {
//       return <img src={firstItem.src} alt={title} />;
//     }

//     // For video, show YouTube thumbnail with play overlay
//     if (firstItem.thumbnail) {
//       return (
//         <div className="video-thumbnail-wrapper">
//           <img src={firstItem.thumbnail} alt={title} className="video-thumbnail" />
//           <div className="play-overlay">
//             <div className="play-button">▶</div>
//           </div>
//         </div>
//       );
//     }

//     return <div className="video-thumb">▶ View Video</div>;
//   };

//   // ================= RENDER =================
//   return (
//     <>
//       <div className="product-card">
//         {/* IMAGE/VIDEO PREVIEW */}
//         <div
//           className="product-image"
//           onClick={() => media.length && setShow(true)}
//           style={{ cursor: media.length ? "pointer" : "default" }}
//         >
//           {renderFirstMedia()}
//         </div>

//         {/* CONTENT */}
//         <div className="product-content">
//           <h5 className="product-title">{title}</h5>
//           <p className="product-desc">{description}</p>

//           {usage && (
//             <div className="product-usage">
//               <strong>Usage:</strong> {usage}
//             </div>
//           )}

//           <div className="product-attrs">
//             {product.attributes
//               ?.filter(
//                 (a) => !["title", "description", "usage"].includes(a.attributeKey)
//               )
//               .map((attr) =>
//                 attr.values.map((val, idx) => (
//                   <span key={idx} className="attr-chip">
//                     {capitalizeFirst(attr.attributeKey)}: {val}
//                   </span>
//                 ))
//               )}
//           </div>

//           {/* GET QUOTE BUTTON */}
//           <div className="product-cta">
//             <button className="quote-btn" onClick={handleGetQuote}>
//               Get Quote
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MEDIA MODAL */}
//       {/* <Modal show={show} onHide={() => setShow(false)} centered size="lg"> */}
//       <Modal show={show} onHide={handleClose} centered size="lg">

//         <Modal.Header closeButton>
//           <Modal.Title>{title}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body className="p-0">
//           <div className="carousel-wrapper">
//             {/* <Carousel interval={null}> */}
//             <Carousel
//   interval={null}
//   slide={false}
//   indicators={media.length > 1}
//   controls={media.length > 1}
// >

//               {media.map((item, idx) => (
//                 <Carousel.Item key={idx}>
//                   {/* <div className="carousel-media">
//                     {item.type === "image" ? (
//                       <img src={item.src} alt={title} />
//                     ) : item.src?.includes("youtube.com") || item.src?.includes("youtu.be") ? (
//                       // YouTube embed
//                       <iframe
//                         src={item.src}
//                         title={`Product Video ${idx + 1}`}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         allowFullScreen
//                         className="w-100 h-100"
//                       />
//                     ) : item.src?.includes("vimeo.com") ? (
//                       // Vimeo embed
//                       <iframe
//                         src={item.src}
//                         title={`Product Video ${idx + 1}`}
//                         frameBorder="0"
//                         allow="autoplay; fullscreen; picture-in-picture"
//                         allowFullScreen
//                         className="w-100 h-100"
//                       />
//                     ) : (
//                       // Direct video file (MP4, WebM, etc.)
//                       <video
//                         controls
//                         className="w-100 h-100"
//                         style={{ maxHeight: "100%", maxWidth: "100%" }}
//                       >
//                         <source src={item.src} type="video/mp4" />
//                         <source src={item.src} type="video/webm" />
//                         <source src={item.src} type="video/ogg" />
//                         Your browser does not support the video tag.
//                       </video>
//                     )}
//                   </div> */}
//   <div className="carousel-media">
//   {item.type === "image" ? (
//     <img src={item.src} alt={title} />
//   ) : typeof item.src === "string" && item.src.includes("youtube.com") ? (
//     <iframe
//       src={item.src}
//       title={`Product Video ${idx + 1}`}
//       frameBorder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//     />
//   ) : (
//     <video controls playsInline>
//       <source src={item.src} type="video/mp4" />
//       <source src={item.src} type="video/webm" />
//       Your browser does not support the video tag.
//     </video>
//   )}
// </div>
//                 </Carousel.Item>
//               ))}
//             </Carousel>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default ProductCard;


// ProductCard.jsx - Updated to match your API setup
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Carousel } from "react-bootstrap";
import "./ProductCard.css";

function ProductCard({ product }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [videos, setVideos] = useState([]);

  // ================= YOUTUBE URL CONVERTER =================
  const convertToEmbedUrl = (url) => {
    if (!url) return null;

    let videoId = null;

    if (url.includes("youtube.com/watch")) {
      try {
        videoId = new URL(url).searchParams.get("v");
      } catch (e) {
        console.warn("Invalid YouTube URL:", url);
        return url;
      }
    } else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    // ✅ FIXED: Removed extra spaces after /embed/
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?rel=0`
      : url;
  };

  // ================= GET YOUTUBE THUMBNAIL =================
  const getYoutubeThumbnail = (url) => {
    const embedUrl = convertToEmbedUrl(url);
    if (!embedUrl?.includes("youtube.com/embed/")) return null;
    const videoId = embedUrl.split("embed/")[1]?.split("?")[0];
    // ✅ FIXED: Removed extra spaces in thumbnail URL
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // ================= LOAD VIDEOS FROM API =================
  const loadVideos = async () => {
    try {
      const res = await axios.get(`${baseURL}/product-videos`, {
        params: { productId: product._id },
      });
      
      console.log("Videos API response:", res.data); // Debug log
      console.log("FULL VIDEO OBJECT:", res.data.data[0]);

      // Convert all YouTube URLs to embed format
      const vids = res.data?.data?.map((v) => convertToEmbedUrl(v.video)) || [];
      setVideos(vids);
    } catch (err) {
      console.error("Error loading videos:", err);
      setVideos([]);
    }
  };

  // ================= LOAD IMAGES FROM API =================
  const loadImages = async () => {
    try {
      const res = await axios.get(`${baseURL}/product-images`, {
        params: { productId: product._id },
      });

      console.log("Images API response:", res.data);

      const imgs =
        res.data?.data?.map((imgObj) => imgObj.image).filter(Boolean) || [];

      setImages(imgs);
    } catch (err) {
      console.error("Error loading images:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product?._id) {
      loadImages();
      loadVideos();
    }
  }, [product?._id]);

  // ================= COMBINE MEDIA (IMAGES FIRST, THEN VIDEOS) =================
  const media = [
    ...images.map((i) => ({ type: "image", src: i })),
    ...videos.map((v) => ({ 
      type: "video", 
      src: v,
      thumbnail: getYoutubeThumbnail(v)
    })),
  ];

  console.log("Combined media:", media); // Debug log

  // ================= HELPER FUNCTIONS =================
  const getAttr = (key) =>
    product.attributes?.find((a) => a.attributeKey === key)?.values?.[0];

  const truncateText = (text, wordLimit = 12) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const capitalizeFirst = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const title = getAttr("title") || "Product";
  const description = truncateText(getAttr("description"), 14);
  const usage = getAttr("usage");

  // ================= NAVIGATION =================
  const handleGetQuote = () => {
    navigate("/contact", {
      state: {
        productId: product._id,
        productTitle: title,
      },
    });
  };

  const handleClose = () => {
    setShow(false);
    setVideos((prev) => [...prev]); // reset iframe
  };

  // ================= RENDER FIRST MEDIA =================
  const renderFirstMedia = () => {
    if (loading) {
      return <div className="img-placeholder">Loading...</div>;
    }

    if (!media.length) {
      return <div className="img-placeholder">No Media</div>;
    }

    const firstItem = media[0];

    if (firstItem.type === "image") {
      return <img src={firstItem.src} alt={title} />;
    }

    // For video, show YouTube thumbnail with play overlay
    if (firstItem.thumbnail) {
      return (
        <div className="video-thumbnail-wrapper">
          <img src={firstItem.thumbnail} alt={title} className="video-thumbnail" />
          <div className="play-overlay">
            <div className="play-button">▶</div>
          </div>
        </div>
      );
    }

    return <div className="video-thumb">▶ View Video</div>;
  };

  // ================= RENDER =================
  return (
    <>
      <div className="product-card">
        {/* IMAGE/VIDEO PREVIEW */}
        <div
          className="product-image"
          onClick={() => media.length && setShow(true)}
          style={{ cursor: media.length ? "pointer" : "default" }}
        >
          {renderFirstMedia()}
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
                (a) => !["title", "description", "usage"].includes(a.attributeKey)
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

      {/* MEDIA MODAL */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          <div className="carousel-wrapper">
            <Carousel
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
                    ) : typeof item.src === "string" && item.src.includes("youtube.com") ? (
                      <iframe
                        src={item.src}
                        title={`Product Video ${idx + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video controls playsInline>
                        <source src={item.src} type="video/mp4" />
                        <source src={item.src} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductCard;