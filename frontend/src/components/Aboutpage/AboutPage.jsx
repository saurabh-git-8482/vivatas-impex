import { Container, Row, Col, Card } from "react-bootstrap";

import exportImg from "../../assets/about/about-export.jpg";

import "./About.css";

const values = [
  {
    id: 1,
    title: "Commitment to Quality",
    text: "We uphold the highest quality standards across all products, ensuring excellence from sourcing to final delivery. ",
  },
  {
    id: 2,
    title: "Trust & Transparency",
    text: "We build long-term partnerships through ethical practices, open communication, and consistent reliability.",
  },
  {
    id: 3,
    title: "Customer-Centric Approach",
    text: "Our clients come first. We offer personalized solutions and proactive support aligned with your business objectives.",
  },
  {
    id: 4,
    title: "Global Perspective",
    text: " We connect Indian excellence with global markets, strengthening international trade relationships across continents. ",
  },
  {
    id: 5,
    title: "Operational Excellence",
    text: " Our disciplined logistics and strict adherence to timelines ensure smooth, disruption-free business operations. ",
  },
  {
    id: 6,
    title: "Culture of Continuous Growth",
    text: "We continuously enhance our processes, expertise, and capabilities to deliver greater value and exceed client expectations. ",
  },
];
const features = [
  {
    title: "Assured Quality Standards",
    text: "Every product is carefully inspected and tested to meet international quality benchmarks, ensuring consistent and reliable excellence. ",
  },
  {
    title: " Strong Global Reach",
    text: "Our well-established international network enables smooth and efficient access to key global markets.",
  },
  {
    title: "Cost-Effective Solutions",
    text: "We offer superior quality at competitive market prices, delivering maximum value without compromising standards.",
  },
  {
    title: " Reliable & Timely Delivery ",
    text: "Backed by an efficient logistics system, we ensure on-time shipment and dependable supply schedules. ",
  },
  {
    title: "Dedicated Client Support",
    text: "Our experienced team provides round-the-clock assistance, ensuring seamless coordination and quick issue resolution.",
  },
  {
    title: "Sustainable & Responsible Trade",
    text: "We follow environmentally conscious sourcing and logistics practices, supporting long-term sustainability and ethical business.",
  },
];
const sectionStyle = {
  // backgroundColor: "#F9F7F0", // Exact cream background from image
  padding: "80px 0",
  fontFamily: '"Cinzel", serif', // Header font
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "60px",
  letterSpacing: "2px",
  fontWeight: "500",
  color: "#1a1a1a",
  textTransform: "uppercase",
};

const cardStyle = {
  backgroundColor: "#F3F2E9z", // Slightly darker cream for the cards
  border: "1px solid #E5E2D0",
  borderRadius: "0px", // Sharp corners as seen in the image
  height: "100%",
  padding: "20px",
};

const cardTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "#333",
  marginBottom: "15px",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const cardTextStyle = {
  fontFamily: '"Arial", sans-serif', // Clean body font
  fontSize: "0.9rem",
  color: "#555",
  lineHeight: "1.6",
};
const AboutPage = () => {
  return (
    <section className="py-5 " style={{ backgroundColor: "#FFFEF2" }}>
      <Container>
        {/* ===== PAGE HEADER ===== */}
        <div className="text-center mb-4 mb-md-5 px-2">
          <h2 className="fw-bold display-6">ABOUT VIVATAS IMPEX</h2>
          <p className="text-muted mt-2">
            Established 2019 | Trusted Global Trading Partner{" "}
          </p>
        </div>

        {/* ===== INTRO SECTION ===== */}
        <Row className="align-items-center g-4 g-md-5 mb-4 mb-md-5">
          <Col xs={12} md={6} className="text-center text-md-start">
            <h1
              className="text-danger fw-semibold fw-bold"
              style={{ color: "#B11228" }}
            >
              OUR STORY{" "}
            </h1>
            <h4 className="fw-bold mt-2 mb-3">
              Delivering Quality Products to Global Markets
            </h4>

            <p className="text-secondary">
              <strong className="text-danger">VIVATAS IMPEX</strong> is a global
              trading company engaged in sourcing and supplying premium Indian
              products, including edible vegetables, frozen foods, textiles,
              marble, and carpets. We serve international markets across North
              America, Europe, and Africa, delivering consistent quality through
              reliable supply chains and strong partner relationships.
            </p>
          </Col>

          <Col xs={12} md={6}>
            <img
              src={exportImg}
              alt="Vivatas Impex Global Export"
              className="img-fluid rounded-4 shadow w-100 mission-card"
              style={{
                maxHeight: "380px",
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>

       
        <section
          className="values-section py-5"
          // style={{ backgroundColor: "#f9f7f0" }}
        >
          <Container>
            <h2 className="text-center mb-5 core-values-heading">
              OUR CORE VALUES
            </h2>
            <Row className="g-4 justify-content-center">
              {values.map((value) => (
                <Col key={value.id} xs={12} md={6} lg={4}>
                  <Card className="value-card h-100 border-0 shadow-sm">
                    <Card.Body className="p-4 d-flex flex-column position-relative">
                      {/* Watermark Number */}
                      {/* <span className="value-number">{value.id}</span> */}

                      <h5 className="value-title">
                        {value.title.toUpperCase()}
                      </h5>
                      <p className="value-text mt-3">{value.text}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ===== MISSION & VISION ===== */}
        <Row className="g-4 mt-4 justify-content-center">
          {/* OUR VISION CARD */}
          <Col xs={12} md={6}>
            <Card className="vision-mission-card h-100">
              <Card.Body className="p-4 p-lg-5">
                <h3 className="card-title-gold mt-2">OUR VISION</h3>
                <p className="card-text-main mt-4">
                  To be a globally trusted sourcing partner for Indian products,
                  known for uncompromising quality, transparency, and ethical
                  business practices.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* OUR MISSION CARD */}
          <Col xs={12} md={6}>
            <Card className="vision-mission-card h-100">
              <Card.Body className="p-4 p-lg-5">
                <h3 className="card-title-gold mt-2">OUR MISSION</h3>
                <p className="card-text-main mt-4">
                  To connect India’s finest products with global markets by
                  delivering excellence, integrity, and sustainable, long-term
                  partnerships.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <section style={sectionStyle}>
          <Container>
            <h2 style={titleStyle}>Why Choose Vivatas Impex</h2>
            <Row className="g-4">
              {features.map((item, index) => (
                <Col key={index} xs={12} md={6} lg={4}>
                  <Card style={cardStyle} className="shadow-none">
                    <Card.Body>
                      <h5 style={cardTitleStyle}>{item.title}</h5>
                      <p style={cardTextStyle}>{item.text}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </Container>
    </section>
  );
};

export default AboutPage;
