import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [Ulist, setUlist] = useState([]);
  const formatMoney = (money) =>
    (Math.round(money * 100) / 100).toLocaleString().replaceAll(",", ",");

  const Registers = async (userData) => {
    try {
      const res = await axios.post(`http://localhost:9999/users`, userData);
      setUlist([...Ulist, res.data]);
      alert("Registration successful");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const LoginUser = async (userData) => {
    try {
      const res = await axios.get(`http://localhost:9999/users`);
      const listUser = res.data;
      const userLogin = listUser.find(
        (u) =>
          u.username === userData.username && u.password === userData.password
      );

      if (userLogin) {
        setUser(userLogin);
        alert("Login successful!");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const Logout = () => {
    setUser(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const addToCart = (product) => {
    if (user) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
      alert("Add to cart success!");
    } else {
      alert("Please login to add to cart");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/products`);
        setProducts(res.data);
      } catch (error) {
        console.log("Fetch products error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/users`);
        setUlist(res.data);
      } catch (error) {
        console.log("Fetch products error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/categories`);
        setCategories(res.data);
      } catch (error) {
        console.log("Fetch categories error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        addToCart,
        cart,
        setCart,
        searchTerm,
        handleSearch,
        LoginUser,
        Logout,
        user,
        Ulist,
        Registers,
        formatMoney,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ProductsProvider;
