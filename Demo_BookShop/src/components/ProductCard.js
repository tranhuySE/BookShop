import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/ProductsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  const { addToCart, formatMoney } = useContext(Context);
  return (
    <div className="card mb-4">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text">
          <strong>{formatMoney(product.price)} VND</strong>
        </p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          Details
        </Link>
        <button
          className="btn btn-danger mx-3"
          onClick={() => addToCart(product)}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
