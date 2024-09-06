import { useState } from "react";
import "./createproduct.style.css"

function CreateProduct() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    e.preventDefault()
    setImage([e.target.files[0]]);

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
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className="create-product">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="" className="form-field" >
          <p>Title</p>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label htmlFor="" className="form-field">
          <p>Price</p>
          <input type="number" onChange={(e) => setPrice(parseInt(e.target.value))} />
        </label>
        <label htmlFor="" className="form-field">
          <p>Description</p>
          <textarea type="text" onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label htmlFor="" className="form-field" onChange={(e) => handleImage(e)}>
          <p>Images</p>
          <input type="file" />
        </label>
        <label htmlFor="" className="form-field">
          <p>Category</p>
          <input type="text" onChange={(e) => setCategory(e.target.value)} />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  )
}

export default CreateProduct;