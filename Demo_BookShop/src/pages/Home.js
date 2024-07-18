import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Context } from "../context/ProductsProvider";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FormCheck } from "react-bootstrap";

const Home = () => {
  const { products, categories, searchTerm } = useContext(Context);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  const handleFilter = (id) => {
    id === -1
      ? setFilterProducts(products)
      : setFilterProducts(
          products.filter((product) => product.category === parseInt(id))
        );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <h2>Category</h2>
          <FormCheck
            type="radio"
            name="a"
            label="All Category"
            onClick={() => {
              handleFilter(-1);
            }}
          />
          {categories.map((category, index) => (
            <FormCheck
              key={index}
              name="a"
              type="radio"
              label={category.name}
              onClick={() => {
                handleFilter(category.id);
              }}
            />
          ))}
        </div>
        <div className="col-10">
          <div className="row">
            {filterProducts.map((product, index) => (
              <div className="col-md-3" key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
