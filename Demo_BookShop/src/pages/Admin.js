import React, { useState, useContext } from "react";
import { Context } from "../context/ProductsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const { products, setProducts, categories, formatMoney } =
    useContext(Context);
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePrice, setErrorMessagePrice] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
    if (name === "category") {
      setProductForm({ ...productForm, category: parseInt(value) });
    }
    if (name === "name") {
      const n = products.some(
        (p) => p.name.toLowerCase() === value.toLowerCase().trim()
      );
      n
        ? setErrorMessage("Book name have already exists!")
        : setErrorMessage("");
    }
    if (name === "price") {
      value < 1 && value !== ""
        ? setErrorMessagePrice("Price must be greater than or equal to 0!")
        : setErrorMessagePrice("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productForm.id ? productForm : product
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...productForm, id: products.length + 1, status: true },
      ]);
      alert("Add product successfully!");
    }
    setProductForm({ id: "", name: "", price: "", image: "", category: "" });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setProductForm(product);
    setIsEditing(true);
  };

  const handleRemove = (id) => {
    const yes = window.confirm(`Are you sure you want to remove this product?`);
    if (yes) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
      alert("Delete product successfully!");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productForm.name}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productForm.price}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        {errorMessagePrice && (
          <div className="text-danger mt-2">{errorMessagePrice}</div>
        )}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={productForm.image}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <select
          name="category"
          value={productForm.category}
          onChange={handleChange}
          required
          className="form-control mb-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={errorMessage || errorMessagePrice !== ""}
        >
          <FontAwesomeIcon icon={faPlus} /> {isEditing ? "Update" : "Add"}{" "}
          Product
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                {product.name}
              </td>
              <td>{formatMoney(product.price)} VND</td>
              <td>
                {categories.find((cat) => cat.id === product.category)?.name}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-1"
                  onClick={() => handleEdit(product)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
