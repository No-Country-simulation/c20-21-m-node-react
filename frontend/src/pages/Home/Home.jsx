import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import Cards from "../../components/cards/cards";
import logoImage from "../../assets/logoImage.svg";
import "./home.styles.css";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderBy, setOrderBy] = useState({ field: "title", order: "asc" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); 
  const productsPerPage = 9;

  useEffect(() => {
    
    const query = searchQuery ? `&query=${searchQuery}` : '';
    fetch(
      `https://popmart-backend-beta.vercel.app/api/products?limit=${productsPerPage}&page=${page}${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.payload);
          setFilteredProducts(data.payload);
          setTotalPages(data.totalPages);
        } else {
          console.error("Error fetching products:", data.error);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [page, searchQuery]); 

  const toggleOrder = () => {
    const newOrder = orderBy.order === "asc" ? "desc" : "asc";
    setOrderBy({ field: "title", order: newOrder });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const fieldA = a.title.toLowerCase();
      const fieldB = b.title.toLowerCase();
      const orderFactor = newOrder === "asc" ? 1 : -1;
      return fieldA.localeCompare(fieldB) * orderFactor;
    });

    setFilteredProducts(sortedProducts);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleSearch = (searchValue) => {
    setSearchQuery(searchValue); 
  };

  return (
    <>
      <div className="navbar-container">
        <NavBar onSearch={handleSearch} />
      </div>
      <div className="home-container">
        <img
          src={logoImage}
          alt="PopMart logo"
          style={{ width: 300, height: 300, marginRight: 5 }}
        />
        <br />

        <button className="filter-button" onClick={toggleOrder}>
          Sort By Title {orderBy.order === "asc" ? "↓" : "↑"}
        </button>

        <Cards allProducts={filteredProducts} />

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
