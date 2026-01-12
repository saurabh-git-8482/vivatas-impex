// import { Container, Row, Col, Card, Modal } from "react-bootstrap";
// import { useState } from "react";
// import "./GalleryPage.css"
// // 👉 Carpet Images
// import carpet1 from "../../assets/carpetimg/dhurries1.jpg";
// import carpet2 from "../../assets/carpetimg/dhurries2.jpg";
// import carpet3 from "../../assets/carpetimg/dhurries3.jpg";
// import carpet4 from "../../assets/carpetimg/dhurries4.jpg";
// import carpet5 from "../../assets/carpetimg/kilim1.jpg";
// import carpet6 from "../../assets/carpetimg/kilim2.jpg";

// import corn from "../../assets/Premium Fresh Vegetables & Frozen Foods/corn.jpg";
// import peas from "../../assets/Premium Fresh Vegetables & Frozen Foods/peas.jpg";
// import image1 from "../../assets/Fine textiles/image1.jpg";
// import image2 from "../../assets/Fine textiles/image2.jpg";
// import image3 from "../../assets/Fine textiles/image3.jpg";
// import image4 from "../../assets/Fine textiles/image4.jpg";
// import image5 from "../../assets/Fine textiles/image5.jpg";

// // 👉 Gallery Items with CATEGORY
// const galleryItems = [
//   { id: 1, title: "Carpet 1", image: carpet1, category: "Artisan Handwoven Carpets" },
//   { id: 2, title: "Carpet 2", image: carpet2, category: "Artisan Handwoven Carpets" },
//   { id: 3, title: "Carpet 3", image: carpet3, category: "Artisan Handwoven Carpets" },
//   { id: 4, title: "Carpet 4", image: carpet4, category: "Artisan Handwoven Carpets" },
//   { id: 5, title: "Carpet 5", image: carpet5, category: "Artisan Handwoven Carpets" },
//   { id: 6, title: "Carpet 6", image: carpet6, category: "Artisan Handwoven Carpets" },
 
//   {id:15,title:"foods 1",image:corn ,category:"Premium Fresh Vegetables & Frozen Foods "},
//   {id:16,title:"foods 2",image:peas ,category:"Premium Fresh Vegetables & Frozen Foods "},
//   { id:18,title:"textile 1",image:image1 ,category:"Fine Textiles & Fabrics "},
//   { id:19,title:"textile 2",image:image2 ,category:"Fine Textiles & Fabrics "},
//   { id:20,title:"textile 3",image:image3 ,category:"Fine Textiles & Fabrics "},  
//   { id:21,title:"textile 4",image:image4 ,category:"Fine Textiles & Fabrics "},
//   { id:22,title:"textile 5",image:image5 ,category:"Fine Textiles & Fabrics "},
// ];

// // 👉 Categories
// const categories = ["All", "Premium Fresh Vegetables & Frozen Foods ", "Artisan Handwoven Carpets", "Fine Textiles & Fabrics "];

// const GalleryPage = () => {
//   const [show, setShow] = useState(false);
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [title, setTitle] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");

//   const handleShow = (img, title) => {
//     setSelectedImg(img);
//     setTitle(title);
//     setShow(true);
//   };

//   // 👉 Filter Logic
//   const filteredItems =
//     activeCategory === "All"
//       ? galleryItems
//       : galleryItems.filter((item) => item.category === activeCategory);

// //       const certifications = [
// //   {
// //     year: "2019",
// //     title: "FSSAI APPROVED",
// //     text: "Certified by the Food Safety and Standards Authority of India, ensuring the highest standards of food safety and quality in all food product exports.",
// //   },
// //   {
// //     year: "2019",
// //     title: "APEDA REGISTERED",
// //     text: "Officially registered with the Agricultural and Processed Food Products Export Development Authority, validating our expertise in agricultural exports.",
// //   },
// //   {
// //     year: "2021",
// //     title: "IEC (IMPORT EXPORT CODE)",
// //     text: "Authorized with Import Export Code from DGFT, enabling legitimate international trade operations across all product categories.",
// //   },
// //   {
// //     year: "2022",
// //     title: "RCMC CERTIFICATE",
// //     text: "Registered with Export Promotion Councils, demonstrating credibility and eligibility for government export benefits and schemes.",
// //   },
// // ];


//   return (
//     <>
//      {/* <section className="certifications-section">
//       <Container>
//         <div className="text-center mb-4">
//           <h2 className="fw-bold">Gallery & Certificates</h2>
//           <p className="text-muted">
//          Our Journey in Images | Certifications & Recognition
//           </p>
//         </div>
//         <h2 className="certifications-heading text-center">
//           Our Certifications
//         </h2>

//         <Row className="gy-5 justify-content-center">
//           {certifications.map((item, index) => (
//             <Col md={4} sm={6} key={index}>
//               <Card className="certification-card text-center">
//                 <div className="cert-year-circle">
//                   {item.year}
//                 </div>

//                 <h5 className="cert-title">{item.title}</h5>
//                 <p className="cert-text">{item.text}</p>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </section> */}
//     <section className="py-5"  style={{backgroundColor:"#F6F5E8"}}>
//       <Container>

//         {/* Header */}
//         {/* <div className="text-center mb-4">
//           <h2 className="fw-bold">Gallery & Certificates</h2>
//           <p className="text-muted">
//          Our Journey in Images | Certifications & Recognition
//           </p>
//         </div> */}
//           <h2 className="certifications-heading text-center">
//           Our Gallary
//         </h2>

//         {/* 👉 Category Tabs */}
//         <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`btn px-4 py-2 rounded-pill ${
//                 activeCategory === cat
//                   ? "text-white"
//                   : "bg-white border"
//               }`}
//               style={{
//                 background:
//                   activeCategory === cat ? "#333" : "white",
//                 borderColor: "#333",
//               }}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Gallery Grid */}
//         <Row className="g-4">
//           {filteredItems.map((item) => (
//             <Col lg={3} md={4} sm={6} xs={12} key={item.id}>
//               <Card
//                 className="h-100 shadow-sm border-0"
//                 onClick={() => handleShow(item.image, item.title)}
//                 style={{ cursor: "pointer", borderRadius: "16px" }}
//               >
//                 <Card.Img
//                   src={item.image}
//                   alt={item.title}
//                   style={{ height: "220px", objectFit: "cover" }}
//                 />
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {/* Image Modal */}
//         <Modal show={show} onHide={() => setShow(false)} centered size="lg">
//           <Modal.Header closeButton>
//             <Modal.Title>{title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body className="p-0">
//             <img src={selectedImg} alt={title} className="w-100" />
//           </Modal.Body>
//         </Modal>

//       </Container>
//     </section>
//     </>
//   );
// };


// export default GalleryPage;


