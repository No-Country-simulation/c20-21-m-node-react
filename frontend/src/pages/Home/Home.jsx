import { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import NavBar from '../../components/Navbar';

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
      <div>
       <NavBar/>
      </div>
      <h1>Marketplace</h1>
      <div className="product-list">
        {products.map(product => (
          <Card key={product._id} product={product} />  
        ))}
      </div>
    </div>
  );
};
