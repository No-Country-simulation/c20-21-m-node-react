// src/pages/home/Home.jsx
import React, { useEffect, useState } from 'react';
import Cards from '../../components/cards/cards';

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // prueba
    const productosPrueba = [
      { id: 1, name: 'Prueba 1', price: 100 },
      { id: 2, name: 'Prueba 2', price: 150 },
      { id: 3, name: 'Prueba 3', price: 200 }
    ];

    setProducts(productosPrueba);

    /*
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
    */
  }, []);

  return (
    <div className="home">
      <h1>Marketplace</h1>
      <div className="product-list">
        {products.map(product => (
          <Cards key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};


