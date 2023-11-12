import React, { useState } from "react";
import "./App.css";
import ListProducts from "./components/products/list/list";
import AddProduct from "./components/products/add/add";
import Search from "./components/products/search/search";
function App() {
  const refershGrid = (filters: any) => {
    console.log(filters);
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
              <ListProducts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
