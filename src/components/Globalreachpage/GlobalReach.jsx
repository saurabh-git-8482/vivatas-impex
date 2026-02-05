import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import worldMap from "../../assets/world-map.png";
import "./GlobalReach.css";

const regions = [
  "North America",
  "South America",
  "Europe & UK",
  "Middle East (UAE, Saudi)",
  "Asia (Vietnam, Thailand, Singapore)",
  "East Asia",
  "Africa",
  "Australia",
];

const baseURL = import.meta.env.VITE_API_BASE_URL;

const GlobalReach = () => {
  const [reviews, setReviews] = useState([]);

 useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${baseURL}/reviews`, {
        params: {
          domainName: "vivatasimpex.com",
          limit: 6,
        },
      });

      // ✅ FORCE ARRAY EXTRACTION
      let reviewArray = [];

      if (Array.isArray(res.data)) {
        reviewArray = res.data;
      } else if (Array.isArray(res.data.data)) {
        reviewArray = res.data.data;
      } else if (Array.isArray(res.data.reviews)) {
        reviewArray = res.data.reviews;
      }

      setReviews(reviewArray);
    } catch (error) {
      console.error("Review fetch failed:", error);
      setReviews([]);
    }
  };

  fetchReviews();
}, []);


  return (
    <>
      {/* HERO SECTION */}
      <section className="py-5 text-dark" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={12} className="text-center">
              <h1 className="fw-bold">Our Global Reach</h1>
              <p className="mt-3 fs-5">
                Connecting India to the world with premium export-quality
                products
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MAP SECTION */}
      <section className="py-0" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <Row>
            <Col md={12} className="text-center mb-4">
              <h2 className="fw-bold text-danger">India – Our Export Origin</h2>
              <p className="text-muted">
                From India, Vivatas Impex delivers quality products across
                continents
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={12}>
              <Card className="shadow border-0">
                <Card.Body className="p-3">
                  <img
                    src={worldMap}
                    alt="Vivatas Impex Global Export Reach Map from India"
                    className="img-fluid"
                    width="1200"
                    height="600"
                    loading="eager"
                    decoding="async"
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* REGIONS SECTION */}
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2 className="fw-bold">Markets We Serve</h2>
              <p className="text-muted">
                Trusted by global partners across key international markets
              </p>
            </Col>
          </Row>

          <Row>
            {regions.map((region, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <Card className="h-100 text-center shadow-sm border-0">
                  <Card.Body>
                    <i className="bi bi-globe2 fs-2 text-danger mb-3"></i>
                    <h6 className="fw-semibold">{region}</h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     

      {/* REVIEWS SECTION */}
      <section className="py-5" style={{ backgroundColor: "#F6F5E8" }}>
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2 className="fw-bold">What Our Global Clients Say</h2>
              <p className="text-muted">
                Trusted by international buyers across multiple continents
              </p>
            </Col>
          </Row>

          <Row>
  {reviews.length > 0 ? (
    reviews.map((review, index) => (
      <Col md={4} sm={12} key={index} className="mb-4">
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="text-center">
            <div className="mb-2 text-warning fs-5">
              {"★".repeat(review.rating || 0)}
              {"☆".repeat(5 - (review.rating || 0))}
            </div>

            <p className="fst-italic text-muted">
              “{review.feedback}”
            </p>

            <h6 className="fw-semibold mb-0">{review.name}</h6>
            <small className="text-muted">{review.location}</small>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <Col className="text-center text-muted">
      No reviews available
    </Col>
  )}
</Row>


          <Row className="mt-4">
            <Col className="text-center">
              <a
                href="https://g.page/r/CfuBTlE6_TCpEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger px-4 py-2"
              >
                ⭐ View a Google Reviews
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default GlobalReach;
