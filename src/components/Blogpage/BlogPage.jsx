
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogPage.css";

// Import environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/blogs?domainName=${DOMAIN_NAME}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        
        const data = await response.json();
        
        // Handle different response structures
        // If data is an object with a blogs property, use that
        // Otherwise if data is already an array, use it directly
        const blogsArray = Array.isArray(data) ? data : (data.blogs || data.data || []);
        
        setBlogs(blogsArray);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              {/* <span className="visually-hidden">Loading...</span> */}
            </div>
            {/* <p className="mt-3 text-muted">Loading blogs...</p> */}
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <div className="text-center py-5">
            {/* <p className="text-danger">Error loading blogs: {error}</p> */}
          </div>
        </Container>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <div className="text-center py-5">
            <p className="text-muted">No blogs available at the moment.</p>
          </div>
        </Container>
      </section>
    );
  }

  // Ensure blogs is an array before proceeding
  const blogsArray = Array.isArray(blogs) ? blogs : [];
  
  if (blogsArray.length === 0) {
    return (
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <div className="text-center py-5">
            <p className="text-muted">No blogs available at the moment.</p>
          </div>
        </Container>
      </section>
    );
  }

  const featured = blogsArray[0];
  const rest = blogsArray.slice(1);

  return (
    <>
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          {/* Top header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
            <div>
              <h1 className="fw-bold mb-2">Vivatas Impex Insights</h1>
              <p className="text-muted mb-0">
                Stories, trends, and export knowledge across frozen foods,
                dehydrated products and handicrafts.
              </p>
            </div>
          </div>

          {/* Main grid: left featured, right list */}
          <Row className="g-4">
            {/* Featured left */}
            <Col lg={10}>
              <Card
                className="border-0 shadow-sm blog-feature-card"
                style={{ backgroundColor: "#F6F5E8" }}
              >
                <div className="blog-feature-img-wrapper">
                  <Card.Img
                    src={featured.image}
                    alt={featured.title}
                    className="blog-feature-img"
                  />
                </div>

                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
                    <span>
                      {featured.createdAt
                        ? new Date(featured.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </span>
                    <span className="dot" />
                    <span>{featured.author || "Vivatas Impex"}</span>
                  </div>
                  <Card.Title className="fw-semibold mb-2">
                    {featured.title}
                  </Card.Title>
                  <Card.Text className="text-muted mb-3">
                    {featured.subTitle || featured.content?.substring(0, 150)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Right column list */}
            <Col lg={5}>
              <div className="d-flex flex-column gap-3">
                {rest.map((blog) => (
                  <Card
                    key={blog._id}
                    className="border-0 shadow-sm blog-list-card"
                    style={{ backgroundColor: "#F6F5E8" }}
                  >
                    <Row className="g-0">
                      <Col xs={4}>
                        <div className="blog-thumb-wrapper">
                          <Card.Img
                            src={blog.image}
                            alt={blog.title}
                            className="blog-thumb-img"
                          />
                        </div>
                      </Col>
                      <Col xs={8}>
                        <Card.Body className="py-3 pe-3">
                          <div className="d-flex align-items-center gap-2 mb-1 text-muted extra-small">
                            <span>
                              {blog.hashtags && blog.hashtags.length > 0
                                ? blog.hashtags[0]
                                : "Frozen Foods"}
                            </span>
                            <span className="dot" />
                            <span>
                              {blog.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : ""}
                            </span>
                          </div>
                          <Card.Title className="h6 mb-1">
                            {blog.title}
                          </Card.Title>
                          <Card.Text className="text-muted small mb-1">
                            {blog.subTitle || blog.content?.substring(0, 100)}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogPage;