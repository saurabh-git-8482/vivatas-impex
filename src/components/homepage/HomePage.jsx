import { Container, Row, Col, Card } from "react-bootstrap";
import pic from "../../assets/homepage/image.png";
import frozenImg from "../../assets/about/about-frozen-food.jpg";
import carpetImg from "../../assets/about/about-carpet2.jpg";
import onionImg from "../../assets/about/imagea.png";
import marbaleImg from "../../assets/about/image1.png";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // ✅ Add this

  const productSections = [
    {
      title: "Premium Fresh Vegetables & Frozen Foods",
      text: "We source a wide range of leafy greens, root vegetables, squashes, and exotic produce directly from India’s finest farms. Our frozen portfolio includes sweet corn, green peas, baby corn, fruits, vegetables, snacks, appetizers, frozen meats, and seafood—processed to retain freshness, taste, and nutrition. ",
      Link: "products/premium-fresh-vegetables-&-frozen-foods",
      img: frozenImg,
      reverse: true,
    },
    {
      title: "Artisan Handwoven Carpets",
      text: "Premium handwoven carpets crafted by skilled Indian artisans, blending traditional motifs with contemporary designs. Each piece reflects exceptional craftsmanship and timeless elegance.",
      img: carpetImg,
      reverse: false,
    },
    {
      title: "Fine Textiles & Fabrics",
      text: "A diverse range of raw materials, Yarn, fabrics, garments, and apparel showcasing India’s rich textile legacy combined with modern production techniques. ",
      img: onionImg,
      reverse: true,
    },
    {
      title: "Luxurious Indian Marble",
      text: "High-quality marble for residential, commercial, and artistic applications, sourced from India’s renowned quarries and crafted for global standards. ",
      img: marbaleImg,
      reverse: false,
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
    backgroundColor: "#F6F5E8", // Exact cream background from image
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
    // backgroundColor: "#F6F5E8", // Slightly darker cream for the cards
    // border: "1px solid #E5E2D0",
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

  return (
    <>
      <div className="homepage-wrapper">
        {" "}
        <section
          className="py-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${pic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7 text-white">
                <h1 className="fw-bold display-4 ">Vivatas Impex</h1>

                <p className="lead mt-3">
                  Trusted Global Exporter of Quality Food Products & Handcrafted
                  Goods
                </p>

                <ul className="list-unstyled mt-4 fs-5">
                  <li>✔ Premium Fresh Vegetables & Premium Frozen Products </li>
                  <li>✔ Fine Textiles & Fabrics</li>
                  <li>✔ Luxurious Indian Marble</li>
                  <li>✔ Artisan Handwoven Carpets</li>
                </ul>

                <div className="mt-4">
                  <button
                    onClick={() =>
                      navigate("/products/artisan-handwoven-carpets")
                    } // ✅ navigate to specific category
                    className="btn btn-danger fw-bold me-3 px-4"
                  >
                    View Products
                  </button>
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn btn-outline-light px-4"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="py-5 text-center text-dark"
          style={{ backgroundColor: "#F6F5E8" }}
        >
          <div className="container">
            <h1 className="fw-bold"> Vivatas Impex</h1>
            <p className="lead">
              Exporter of Frozen Foods, Dehydrated Vegetables & Handicrafts
            </p>
            <button
              onClick={() => navigate("/certificates")} // ✅ navigate to specific category
              className="btn btn-danger fw-bold me-3 px-4"
            >
              View Certificates
            </button>
          </div>
        </section>
        {productSections.map((item, index) => (
          <section
            className="py-4 py-md-5"
            key={index}
            style={{ backgroundColor: "#F6F5E8" }}
          >
            <Container>
              <div className="product-hover-card">
                <Row className="align-items-center g-4">
                  <Col
                    xs={12}
                    md={6}
                    className={`text-center text-md-start ${
                      item.reverse ? "order-md-2" : ""
                    }`}
                  >
                    <h3 className="fw-bold product-title">{item.title}</h3>
                    <p className="product-text">{item.text}</p>
                  </Col>

                  <Col xs={12} md={6} className="image-wrapper">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="img-fluid w-100"
                    />
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        ))}
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
      </div>
    </>
  );
};

export default HomePage;
