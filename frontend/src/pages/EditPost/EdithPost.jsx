import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../../components/card/card";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_URL_BACKEND + `/api/products/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error fetching product");
        }
        const data = await response.json();

        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
        setCategory(data.category);
        if (data.productImage && data.productImage.length > 0) {
          setImages(data.productImage);
          setImagePreviews(data.productImage.map(img => img.secure_url)); 
        } else {
          setImages([]);
          setImagePreviews([]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); 
    const urls = files.map(file => URL.createObjectURL(file));
    setImagePreviews(urls); 
  };

  const handleResponseOk = (data) => {
    toast.success(data.message || "Product updated successfully");
  };

  const handleResponseError = (error) => {
    console.error("Error:", error);
    toast.error(error.message || "An error occurred");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach(image => {
      formData.append("productImage", image);
    });

    fetch(import.meta.env.VITE_URL_BACKEND + `/api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            handleResponseError(error);
          });
        }
        return response.json();
      })
      .then((data) => {
        handleResponseOk(data);
        navigate("/post"); 
      })
      .catch((error) => console.log("Fetch error:", error));
  };

  const productData = {
    productImage: [...images.map((img, index) => ({ public_id: index.toString(), secure_url: imagePreviews[index] }))],
    title: title,
    price: price,
    description: description,
    category: category,
  };

  return (
    <>
      <NavBar />
      <div className="create-product">
        <div className="form-container">
          <form id="myForm" onSubmit={handleSubmit}>
            <div className="title-container">
              <h2 className="form-title">Edit Product</h2>
            </div>
            <div className="inputs-container">
              <label htmlFor="title" className="form-field">
                <p>Title</p>
                <input
                  className="input-text"
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label className="form-field">
                <p>Price</p>
                <input
                  className="input-number"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  required
                />
              </label>
              <label className="form-field">
                <p>Description</p>
                <textarea
                  className="input-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <label className="form-field">
                <p>Images</p>
                <input
                  className="input-file"
                  type="file"
                  onChange={handleImage}
                  multiple 
                />
              </label>
              <label className="form-field">
                <p>Category</p>
                <input
                  type="text"
                  className="input-text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="buttons-container">
              <Link to="/post">
                <button className="return-button" style={{ margin: 5 }}>
                  Return
                </button>
              </Link>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
          <div className="card-preview-container">
            <h3 className="card-preview-title">Card preview</h3>
            <Card product={productData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost;
