import React, { useState, useEffect } from "react";
import "./App.css";
import ListProducts from "./components/products/list/list";
import AddProduct from "./components/products/add/add";
import Search from "./components/products/search/search";
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7081/api/products")
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const refershGrid = (filters: any) => {
    console.log(filters);

    var searchQueryDto = {
      filter: {
        FilteredProperties: [
          {
            PropertyName: "CategoryId",
            Value: parseInt(filters.categoryId),
          },
          {
            PropertyName: "SubCategoryId",
            Value: parseInt(filters.subCategoryId),
          },
        ],
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    fetch("https://localhost:7081/api/products/search", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(searchQueryDto),
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="grid grid-cols-8 bg-red-100 gap-2">
        <div className="col-span-1 bg-green-100">
          <Search onFilter={refershGrid} />
        </div>
        <div className="col-span-7 bg-green-100">
          <div className="grid grid-rows-10 bg-yellow-100 ">
            <div className="bg-red-100 row-span-1 gap-5">
              <AddProduct />
            </div>
            <div className="row-span-9">
              <ListProducts products={products} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
