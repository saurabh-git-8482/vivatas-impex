// import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
// import "./BlogPage.css";

// import frozenimg from "../../assets/about/about-frozen-food.jpg";
// import peasimg from "../../assets/peas.jpg";
// import onionimg from "../../assets/onion.jpg";
// import carpetimg from "../../assets/carpet.jpg";
// import mixedvegimg from "../../assets/blogimage/vegi.jpeg"


// import { useNavigate } from "react-router-dom";



// const blogs = [
//   {
//     title: "Benefits of Frozen Sweet Corn for Global Trade",
//     date: "10 Jan 2026",
//     author: "Vivatas Impex",
//     // category: "Frozen Foods",
//     description:
//       "Frozen sweet corn retains freshness, nutrition, and taste, making it a preferred choice for bulk exports and global food industries.",
//     image: frozenimg,
//   },

//   {
//     title: "Why Indian Frozen Green Peas Are in High Demand",
//     date: "05 Jan 2026",
//     author: "Vivatas Impex",
//     category: "Frozen Foods",
//     description:
//       "Indian frozen green peas are known for quality, vibrant color, and long shelf life, ideal for international markets.",
//     image: peasimg,
//   },
//   {
//     title: "Dry Onion & Onion Powder: Export Opportunities",
//     date: "28 Dec 2025",
//     author: "Vivatas Impex",
//     category: "Dehydrated Products",
//     description:
//       "Dehydrated onion products offer cost-effective storage, longer shelf life, and strong demand in global food processing.",
//     image: onionimg,
//   },
//   {
//     title: "Handmade Carpets from India: Tradition Meets Global Style",
//     date: "20 Dec 2025",
//     author: "Vivatas Impex",
//     category: "Handicrafts",
//     description:
//       "Indian handmade carpets combine craftsmanship, durability, and elegance, making them popular in international markets.",
//     image: carpetimg,
//   },
//   {
//     title: "Top Frozen Mixed Vegetables for Export",
//     date: "15 Jan 2026",
//     author: "Vivatas Impex",
//     category: "Frozen Foods",
//     description:
//       "Frozen mixed vegetables like carrot, beans, peas, and sweet corn offer convenience and consistency for HoReCa and retail buyers worldwide.",
//     image: mixedvegimg,
//   },
  
 
// ];

// const BlogPage = () => {
//   const featured = blogs[0];
//   const rest = blogs.slice(1);

//   const navigate = useNavigate();

//   return (
//     <>
   
//       <section className="py-5 "  style={{backgroundColor:"#F6F5E8"}}>
//         <Container>
//           {/* Top header */}
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
//             <div>
//               <h1 className="fw-bold mb-2">Vivatas Impex Insights</h1>
//               <p className="text-muted mb-0">
//                 Stories, trends, and export knowledge across frozen foods,
//                 dehydrated products and handicrafts.
//               </p>
//             </div>

          
//           </div>

//           {/* Main grid: left featured, right list */}
//           <Row className="g-4">
//             {/* Featured left */}
//             <Col lg={10}>
//               <Card
//                 className="border-0 shadow-sm blog-feature-card"
//                 style={{ backgroundColor: "#F6F5E8" }}
//               >
//                 <div className="blog-feature-img-wrapper">
//                   <Card.Img
//                     src={featured.image}
//                     alt={featured.title}
//                     className="blog-feature-img"
//                   />
                
//                 </div>

//                 <Card.Body className="p-4">
//                   <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
//                     <span>{featured.date}</span>
//                     <span className="dot" />
//                     <span>{featured.author}</span>
//                   </div>
//                   <Card.Title className="fw-semibold mb-2">
//                     {featured.title}
//                   </Card.Title>
//                   <Card.Text className="text-muted mb-3">
//                     {featured.description}
//                   </Card.Text>

                  
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Right column list */}
//             <Col lg={5}>
//               <div className="d-flex flex-column gap-3">
//                 {rest.map((blog, index) => (
//                   <Card
//                     key={index}
//                     className="border-0 shadow-sm blog-list-card"
//                     style={{ backgroundColor: "#F6F5E8" }}
//                   >
//                     <Row className="g-0">
//                       <Col xs={4}>
//                         <div className="blog-thumb-wrapper">
//                           <Card.Img
//                             src={blog.image}
//                             alt={blog.title}
//                             className="blog-thumb-img"
//                           />
//                         </div>
//                       </Col>
//                       <Col xs={8}>
//                         <Card.Body className="py-3 pe-3">
//                           <div className="d-flex align-items-center gap-2 mb-1 text-muted extra-small">
//                             <span>{blog.category}</span>
//                             <span className="dot" />
//                             <span>{blog.date}</span>
//                           </div>
//                           <Card.Title className="h6 mb-1">
//                             {blog.title}
//                           </Card.Title>
//                           <Card.Text className="text-muted small mb-1">
//                             {blog.description}
//                           </Card.Text>
                          
//                         </Card.Body>
//                       </Col>
//                     </Row>
//                   </Card>
//                 ))}
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default BlogPage;


import { useEffect, useState } from "react";
import axios from "axios";

const BlogPage = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [blogs, setBlogs] = useState([]);
  const [blogPageData, setBlogPageData] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= BLOG PAGE API ================= */
  useEffect(() => {
    const fetchBlogPage = async () => {
      try {
        const res = await axios.get(`${baseURL}/blog`, {
          params: {
            domainName: "vivatasimpex.com",
          },
        });

        /**
         * backend may return:
         * { pageData, blogs }
         * OR { data }
         * OR array directly
         */

        if (Array.isArray(res.data)) {
          setBlogs(res.data);
          setActiveBlog(res.data[0] || null);
        } else {
          setBlogPageData(res.data.pageData || null);
          setBlogs(res.data.blogs || []);
          setActiveBlog(res.data.blogs?.[0] || null);
        }
      } catch (error) {
        console.error("Error loading blog page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPage();
  }, [baseURL]);

  /* ================= IMAGE HELPER ================= */
  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${baseURL}/uploads/${image}`;
  };

  if (loading) {
    return <div className="text-center py-5">Loading…</div>;
  }

  if (!blogs.length) {
    return (
      <div className="text-center py-5 text-muted">
        No blogs available
      </div>
    );
  }

  return (
    <>
      {/* ================= BLOG HEADER ================= */}
      <section
        className="py-5"
        style={{ backgroundColor: "#F6F5E8" }}
      >
        <div className="container text-center">
          <h1 className="fw-bold">
            {blogPageData?.pageTitle || "Our Blog"}
          </h1>
          <p className="text-muted mt-2">
            {blogPageData?.pageDescription ||
              "Latest insights & updates from Vivatas Impex"}
          </p>

          <div
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#C81D25",
              margin: "15px auto",
            }}
          />
        </div>
      </section>

      {/* ================= BLOG CONTENT ================= */}
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <div className="container">
          <div className="row g-4">
            {/* ================= LEFT BLOG LIST ================= */}
            <div className="col-12 col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Latest Blogs</h5>

                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className={`p-3 rounded mb-2 ${
                        activeBlog?._id === blog._id
                          ? "bg-danger text-white"
                          : "bg-light"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveBlog(blog)}
                    >
                      <h6 className="mb-1">{blog.title}</h6>
                      <small>
                        {new Date(blog.createdAt).toDateString()}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= RIGHT BLOG DETAIL ================= */}
            <div className="col-12 col-md-8">
              <div className="card shadow-sm h-100">
                {activeBlog?.image && (
                  <img
                    src={getImageUrl(activeBlog.image)}
                    alt={activeBlog.title}
                    className="img-fluid rounded-top"
                    style={{
                      maxHeight: "420px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="card-body">
                  <h2 className="fw-bold">{activeBlog.title}</h2>

                  {activeBlog.subtitle && (
                    <h6 className="text-muted mb-3">
                      {activeBlog.subtitle}
                    </h6>
                  )}

                  {/* BLOG CONTENT */}
                  <div
                    style={{ lineHeight: "1.8" }}
                    dangerouslySetInnerHTML={{
                      __html: activeBlog.content,
                    }}
                  />

                  {/* HASHTAGS */}
                  {activeBlog.hashtags?.length > 0 && (
                    <div className="mt-4">
                      {activeBlog.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="badge bg-secondary me-2"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-4">
                    <a
                      href="/contact"
                      className="btn btn-danger"
                    >
                      Contact Vivatas Impex
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
