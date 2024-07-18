import React, { useContext } from "react";
import { Context } from "../context/ProductsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { cart, setCart, formatMoney } = useContext(Context);

  const handleRemove = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    alert("Delete product success!");
  };

  const handleQuantityChange = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
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
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(product, -1)}
                      disabled={product.quantity <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(product, 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </td>
                  <td>{formatMoney(product.price * product.quantity)} VND</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(product)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <h5>Total Price: {formatMoney(totalPrice)} VND</h5>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
