import React, { useEffect, useState } from 'react';
import Cards from '../../components/cards/cards';

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setProducts(data.payload);  
        } else {
          console.error('Error fetching products:', data.error);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="home">
      <h1>Marketplace</h1>
      <div className="product-list">
        {products.map(product => (
          <Cards key={product._id} product={product} />  
        ))}
      </div>
    </div>
  );
};
