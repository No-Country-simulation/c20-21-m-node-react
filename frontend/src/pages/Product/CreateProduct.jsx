import { useState } from "react";
import "./createproduct.style.css"
import toast from "react-hot-toast";
import Card from "../../components/card/card";
import logoImage from "../../assets/logoImage.svg"
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar";

function CreateProduct() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState("")
  const [response, setResponse] = useState()

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0])

    if (e.target.files[0]) {
      const urlBlob = URL.createObjectURL(e.target.files[0])
      setImageBlob(urlBlob)
      console.log(urlBlob)
    }

  }

  const resetAllFields = () => {
    setTitle("")
    setCategory("")
    setDescription("")
    setImage("")
    setImageBlob("")
    setPrice(null)
    document.getElementById("myForm").reset()
  }

  const handleResponseOk = (data) => {
    setResponse(data)
    console.log(data)
    toast.success(data.message)
    resetAllFields()
  }

  const handleResponseError = (data) => {
    setResponse(data)
    console.error(data)
    toast.error(data.message)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('productImage', image);

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => handleResponseOk(data))
      .catch(error => handleResponseError(error));
  }

  const productImageData = () => {
    if (imageBlob) {
      return [{
        public_id: 1,
        secure_url: imageBlob
      }]
    }
    return []
  }

  const productData = {
    productImage: productImageData(),
    title: title,
    price: price
  }

  return (
  <>
    <NavBar/>
    <div className="create-product">
      <img src={logoImage} alt="PopMart logo" style={{ width: 300, height: 300, marginRight: 5, position:"absolute", top:30}} />
      <form action="" id="myForm" onSubmit={(e) => handleSubmit(e)}>
        <h2>Create a Product</h2>
        <label htmlFor="" className="form-field" >
          <p>Title</p>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label htmlFor="" className="form-field">
          <p>Price</p>
          <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} required />
        </label>
        <label htmlFor="" className="form-field">
          <p>Description</p>
          <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label htmlFor="" className="form-field">
          <p>Images</p>
          <input type="file" onChange={(e) => handleImage(e)} required />
        </label>
        <label htmlFor="" className="form-field">
          <p>Category</p>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <button type="submit" className="submit-button">Submit</button>
        <Link to="/home/">
                <button className="return-button" style={{margin:5}}>Return</button>
        </Link>
      </form>
      <div className="card-preview-container">
        <h3 className="card-preview-title">Card preview</h3>
        <Card product={productData} />
        
      </div>

    </div>
  </>
  )
}

export default CreateProduct;