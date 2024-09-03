import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import NavBar from "../../components/Navbar";
import "./home.styles.css";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`/api/products?limit=10&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.payload);
          setProducts(data.payload);
          setTotalPages(data.totalPages);
        } else {
          console.error("Error fetching products:", data.error);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <NavBar />
      <div className="home-container">
        <h1 className="home-title">Marketplace</h1>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-grid-item">
              <Card product={product} />
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
