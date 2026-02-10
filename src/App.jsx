import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import AboutPage from "./components/Aboutpage/AboutPage";
import ProductPage from "./components/Productpage/ProductPage";
import ContactPage from "./components/Contactpage/ContactPage";
import ScrollToTop from "./components/Common/ScrollToTop";
import BlogPage from "./components/Blogpage/BlogPage";
// import GalleryPage from "./components/Productpage/GalleryPage";
import GlobalReach from "./components/Globalreachpage/GlobalReach";
import HomePage from "./components/homepage/HomePage";
import Certificates from "./components/Aboutpage/CertificatePage";
import { ContactProvider } from "./context/ContactContext";


const App = () => {
  return (
    <BrowserRouter>
    <ContactProvider>
      <Navbar />
<ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/certificates" element={<Certificates />} />

        <Route path="/products/:category" element={<ProductPage />} />
        {/* <Route path="/gallery" element={< GalleryPage/>} /> */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/global-reach" element={<GlobalReach />} />

        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
      </ContactProvider>
    </BrowserRouter>
  );
};

export default App;
