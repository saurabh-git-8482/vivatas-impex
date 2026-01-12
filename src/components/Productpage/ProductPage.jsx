// ProductPage.jsx
import {
  useEffect,
  useMemo,
  useState,
  useCallback
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./ProductCard.css";

function ProductPage() {
  const domainName = import.meta.env.VITE_DOMAIN_NAME;
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const { category } = useParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    if (!API_BASE || !domainName) {
      setError("Missing environment configuration");
      return;
    }

    const controller = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const [catRes, prodRes] = await Promise.all([
        axios.get(`${API_BASE}/categories`, {
          params: { domainName },
          signal: controller.signal,
        }),
        axios.get(`${API_BASE}/products`, {
          params: { domainName },
          signal: controller.signal,
        }),
      ]);

      setCategories(catRes.data?.data || []);
      setProducts(prodRes.data?.data || []);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Product load error:", err);
        setError("Failed to load products. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [API_BASE, domainName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const activeCategory = useMemo(() => {
    if (!category) return null;
    return categories.find(
      (c) =>
        c.slug === category ||
        c.name?.toLowerCase().replace(/\s+/g, "-") === category ||
        c.name?.toLowerCase() === category
    );
  }, [categories, category]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return [];
    return products.filter(
      (p) => String(p.categoryId) === String(activeCategory._id)
    );
  }, [products, activeCategory]);

  return (
    <section
      style={{ backgroundColor: "#F6F5E8", minHeight: "100vh" }}
      className="py-4"
    >
      <div className="container mt-4">
        <h3 className="mb-4">{activeCategory?.name || "Products"}</h3>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && (
          <p>No products found</p>
        )}

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-12">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
