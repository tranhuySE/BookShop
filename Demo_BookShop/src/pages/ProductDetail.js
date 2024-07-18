import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/ProductsProvider";

const ProductDetail = () => {
  const { products, addToCart, formatMoney } = useContext(Context);
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <strong>Price: {formatMoney(product.price)} VND</strong>
        </p>
        <button className="btn btn-success" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
