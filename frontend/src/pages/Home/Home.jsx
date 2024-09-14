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
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const productsPerPage = 9;

  useEffect(() => {
    const query = searchQuery ? `&query=${searchQuery}` : "";
    fetch(
      import.meta.env.VITE_URL_BACKEND +
        `/api/products?limit=${productsPerPage}&page=${page}${query}`
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

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    filtered.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return orderBy.order === "asc" ? -1 : 1;
      if (titleA > titleB) return orderBy.order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProducts(filtered);
  };

  // Por si deseamos que los productos se filtren inmediatamente al poner un valor en los filtros
  useEffect(() => {
    filterProducts();
  }, [orderBy, searchQuery]); // Comentar esto
  // }, [products, searchQuery, minPrice, maxPrice, category, orderBy]); // Descomentar esto

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const toggleOrder = () => {
    setOrderBy({
      field: "title",
      order: orderBy.order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <>
      <div className="navbar-container">
        <NavBar onSearch={setSearchQuery} />
      </div>
      <div className="home-container">
        <img
          src={logoImage}
          alt="PopMart logo"
          style={{ width: 300, height: 300, marginRight: 5 }}
        />
        <br />

        {/* Controles de Filtros */}
        <div className="filter-container">
          <label>
            Precio Mínimo:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Precio mínimo"
            />
          </label>
          <label>
            Precio Máximo:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Precio máximo"
            />
          </label>
          <label>
            Categoría:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Categoría"
            />
          </label>
          <button onClick={filterProducts}>Filtrar</button>
        </div>

        <button className="filter-button" onClick={toggleOrder}>
          Ordenar por Título {orderBy.order === "asc" ? "↓" : "↑"}
        </button>

        <Cards allProducts={filteredProducts} />

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Anterior
          </button>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};
