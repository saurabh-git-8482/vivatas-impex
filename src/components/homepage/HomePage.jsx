
import { Container, Row, Col, Card } from "react-bootstrap";
import pic from "../../assets/homepage/image.jpeg";
import frozenImg from "../../assets/about/about-frozen-food.jpg";
import carpetImg from "../../assets/about/about-carpet2.jpg";
import onionImg from "../../assets/about/imagea.jpeg";
import marbaleImg from "../../assets/about/image1.jpeg";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const productSections = [
    {
      title: "Premium Fresh Vegetables & Frozen Foods",
      text: "We source a wide range of leafy greens, root vegetables, squashes, and exotic produce directly from India’s finest farms. Our frozen portfolio includes sweet corn, green peas, baby corn, fruits, vegetables, snacks, appetizers, frozen meats, and seafood—processed to retain freshness, taste, and nutrition.",
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
      text: "A diverse range of raw materials, yarn, fabrics, garments, and apparel showcasing India’s rich textile legacy combined with modern production techniques.",
      img: onionImg,
      reverse: true,
    },
    {
      title: "Luxurious Indian Marble",
      text: "High-quality marble for residential, commercial, and artistic applications, sourced from India’s renowned quarries and crafted for global standards.",
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
  

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <img src={pic} alt="Hero" className="hero-image" />

        <div className="hero-overlay">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-7 hero-content text-white">
                <h1 className="fw-bold display-4">Vivatas Impex</h1>

                <p className="lead ">
                  Trusted Global Exporter of Quality Food Products & Handcrafted
                  Goods
                </p>

                <ul className="list-unstyled mb-0 fs-3">
                  <li>✔ Premium Fresh Vegetables & Premium Frozen Products</li>
                  <li>✔ Fine Textiles & Fabrics</li>
                  <li>✔ Luxurious Indian Marble</li>
                  <li>✔ Artisan Handwoven Carpets</li>
                </ul>

                <div className="mb-5 d-flex gap-3 flex-wrap justify-content-center justify-content-md-start">
                  <button
                    onClick={() =>
                      navigate("/products/artisan-handwoven-carpets")
                    }
                    className="btn btn-danger fw-bold px-4"
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
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-5 text-center text-dark intro-section">
        <div className="container">
          <h1 className="fw-bold">Vivatas Impex</h1>
          <p className="lead">
            Exporter of Frozen Foods, Dehydrated Vegetables & Handicrafts
          </p>
          <button
            onClick={() => navigate("/certificates")}
            className="btn btn-danger fw-bold px-4"
          >
            View Certificates
          </button>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      {productSections.map((item, index) => (
        <section className="py-4 py-md-5 product-section" key={index}>
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
                  <h3 className="fw-bold">{item.title}</h3>
                  <p>{item.text}</p>
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

      {/* ================= FEATURES ================= */}
    <section className="why-choose-section" style={{backgroundColor:"#F6F5E8"}}>
  <Container>
    <h2 className="why-choose-title">Why Choose Vivatas Impex</h2>

    <Row className="g-4">
      {features.map((item, index) => (
        <Col key={index} xs={12} md={6} lg={4}>
          <Card className="why-choose-card shadow-none">
            <Card.Body>
              <h5 className="why-choose-card-title">{item.title}</h5>
              <p className="why-choose-card-text">{item.text}</p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</section>

    </>
  );
};

export default HomePage;
