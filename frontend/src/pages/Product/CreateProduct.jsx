import { useState } from "react";
import "./createproduct.style.css";
import toast from "react-hot-toast";
import Card from "../../components/card/card";
import logoImage from "../../assets/logoImage.svg";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar";

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0.00");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState("");
  const [response, setResponse] = useState();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      const urlBlob = URL.createObjectURL(e.target.files[0]);
      setImageBlob(urlBlob);
      console.log(urlBlob);
    }
  };

  const resetAllFields = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImage("");
    setImageBlob("");
    setPrice(null);
    document.getElementById("myForm").reset();
  };

  const handleResponseOk = (data) => {
    setResponse(data);
    console.log(data);
    toast.success(data.message || 'Product created successfully');
    resetAllFields();
  };

  const handleResponseError = (error) => {
    console.error('Error:', error);
    toast.error(error.message || 'An error occurred');
  };

  const token = localStorage.getItem("token")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(token)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("productImage", image);

    fetch(import.meta.env.VITE_URL_BACKEND + "/api/products", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            handleResponseError(error || 'An error occurred');
          });
        }
        return response.json();
      })
      .then((data) => handleResponseOk(data))
      .catch((error) => console.log(error));
  };

  const productImageData = () => {
    if (imageBlob) {
      return [
        {
          public_id: 1,
          secure_url: imageBlob,
        },
      ];
    }
    return [];
  };

  const productData = {
    productImage: productImageData(),
    title: title,
    price: price,
  };

  return (
    <>
      <NavBar />
      <div className="create-product">
        <div className="form-container">
          <form action="" id="myForm" onSubmit={(e) => handleSubmit(e)}>
            <div className="title-container">
              <h2 className="form-title">Create a Product</h2>
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
              <label htmlFor="" className="form-field">
                <p>Price</p>
                <input
                  className="input-number"
                  type="number"
                  step="0.01"
                  placeholder={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === ""
                        ? "0.00"
                        : parseFloat(e.target.value)
                    )
                  }
                  required
                />
              </label>
              <label htmlFor="" className="form-field">
                <p>Description</p>
                <textarea
                  className="input-textarea"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="" className="form-field">
                <p>Images</p>
                <input
                  className="input-file"
                  type="file"
                  onChange={(e) => handleImage(e)}
                  required
                  multiple
                />
              </label>
              <label htmlFor="" className="form-field">
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
              <Link to="/home/">
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

export default CreateProduct;
