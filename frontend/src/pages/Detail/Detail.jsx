import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`); 
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error fetching product');
                }
    
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error.message);
            }
        };
    
        fetchProduct();
    }, [id]);
    

    if (error) {
        return <div>Error loading product: {error}</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <img src={product.productImage} alt={product.title} />
            <p>Category: {product.category}</p>
            <Link to="/home/">
                <button className="return-button">Return</button>
            </Link>
        </div>
    );
};


