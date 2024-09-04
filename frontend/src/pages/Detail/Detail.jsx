import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); // Cambiado a null
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
                setProduct(data); // Aquí guardamos el producto obtenido
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

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <img 
                src={product.productImage && product.productImage[0] ? `data:image/webp;base64,${product.productImage[0]}` : "https://via.placeholder.com/150"} 
                alt={product.title} 
            />
            <p>Category: {product.category}</p>
            <Link to="/home/">
                <button className="return-button">Return</button>
            </Link>
        </div>
    );
};
