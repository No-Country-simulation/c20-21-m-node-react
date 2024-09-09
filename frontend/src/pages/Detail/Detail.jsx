import { useParams, Link } from "react-router-dom";
import "./Detail.styles.css";
import NavBar from "../../components/Navbar";
import { useEffect, useState } from "react";

export const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://popmart-backend.vercel.app/api/products/${id}`); 
    
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

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
    <>
        <NavBar/>
        <div className="detail-container">
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-price">Price: ${product.price}</p>
            <p className="detail-description">Description: {product.description}</p>
            <img 
                className="detail-image"
                src={product.productImage && product.productImage[0] ? product.productImage[0].secure_url : "https://via.placeholder.com/150"} 
                alt={product.title} 
            />
            <p>Category: {product.category}</p>
            <Link to="/home/">
                <button className="return-button">Return</button>
            </Link>
        </div>
    </>
    );
};
