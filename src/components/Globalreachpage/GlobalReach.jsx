import { Container, Row, Col, Card } from "react-bootstrap";
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

const reviews = [
  {
    name: "Hrushikesh Gandhe",
    country: "India",
    text: "Professional, ethical, and quality-focused company. VIVATAS IMPEX has strong expertise in import export services, agricultural products, and handmade carpets. A reliable exporter with excellent customer support.",
  },
  {
    name: "Atharva Gotmare",
    country: "India",
    text: "Quick and good service.",
  },
  {
    name: "Prajwaal Kharadkar",
    country: "India",
    text: "VIVATAS IMPEX is a highly reliable import export company in India. Their quality of agricultural products, frozen foods, and handmade carpets is excellent. Professional service, timely delivery, and great export standards. Highly recommended for global buyers.",
  },
];

const GlobalReach = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="py-5 text-dark"
        style={{
          backgroundColor: "#F6F5E8",
        }}
      >
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
      <section className="py-0 " style={{ backgroundColor: "#F6F5E8" }}>
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

      {/* CTA SECTION */}
      <section
        className="partner-section"
        style={{ backgroundColor: "#F6F5E8" }}
      >
        <Container>
          <div className="partner-content mx-0px">
            <h2 className="partner-heading">Partner With Vivatas Impex</h2>
            <p className="partner-subtext">
              Delivering frozen foods, dehydrated products, and handmade carpets
              worldwide with reliability and trust.
            </p>
            <p className="partner-text ">
              At <strong>Vivatas Impex</strong>, we focus on building long-term,
              transparent, and mutually beneficial partnerships across global
              markets. Our commitment to quality, timely delivery, and ethical
              sourcing positions us as a trusted export partner worldwide. We
              collaborate closely with distributors, importers, wholesalers,
              retailers, and hospitality brands to deliver premium products that
              meet international standards and customer expectations.
            </p>
            <div className="partner-highlights">
              <h5 className="partner-list-title">Why Partner With Us?</h5>

              <ul className="partner-list">
                <li>Consistent product quality & global compliance</li>
                <li>Strong cold-chain and export logistics network</li>
                <li>Custom packaging & private labeling options</li>
                <li>Competitive pricing with reliable supply</li>
                <li>Dedicated export support & transparent communication</li>
              </ul>
            </div>
            Whether expanding into new markets or strengthening supply chains,
            <strong> Vivatas Impex</strong> is your reliable global partner for
            sustainable growth.
          </div>
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
            {reviews.map((review, index) => (
              <Col md={4} sm={12} key={index} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center">
                    <div className="mb-2 text-warning fs-5">★★★★★</div>

                    <p className="fst-italic text-muted">“{review.text}”</p>

                    <h6 className="fw-semibold mb-0">{review.name}</h6>
                    <small className="text-muted">{review.country}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* GOOGLE REVIEW LINK */}
          <Row className="mt-4">
            <Col className="text-center">
              <a
                href="https://g.page/r/CfuBTlE6_TCpEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger px-4 py-2"
              >
                ⭐ Leave a Google Review
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default GlobalReach;
