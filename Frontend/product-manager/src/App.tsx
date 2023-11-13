import React, { useState, useEffect } from "react";
import "./App.css";
import ListProducts from "./components/products/list/list";
import AddProduct from "./components/products/add/add";
import Search from "./components/products/search/search";
import { getbackendbaseUrl } from "./globals";
import { FilterProperty } from "./models/searchQueryDto";
function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState<FilterProperty>({
    categoryId: 0,
    subCategoryId: 0,
  });

  useEffect(() => {
    fetch(`${getbackendbaseUrl()}/api/products`)
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const refershGrid = (filters: FilterProperty) => {
    console.log(filters);
    setFilter(filters);
    loadProducts(filters);
  };

  const loadProducts = (currentFilter: FilterProperty) => {
    var searchQueryDto = {
      filter: {
        FilteredProperties: [
          {
            PropertyName: "CategoryId",
            Value: currentFilter.categoryId,
          },
          {
            PropertyName: "SubCategoryId",
            Value: currentFilter.subCategoryId,
          },
        ],
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    fetch(`${getbackendbaseUrl()}/api/products/search`, {
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
      <div className="grid grid-rows-20 gap -10 py-5">
        <div className="row-span-1 ">
          <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Products Display Application
          </h1>
        </div>
        <div className="row-span-19 px-4 py-4">
          <div className="grid grid-cols-8 bg-red-100 gap-2">
            <div className="col-span-1 bg-green-100">
              <Search onFilter={refershGrid} />
            </div>
            <div className="col-span-7 bg-green-100">
              <div className="grid grid-rows-10 bg-yellow-100 ">
                <div className="bg-red-100 row-span-1 gap-5">
                  <AddProduct
                    label={"Add Product"}
                    reloadGrid={() => loadProducts(filter)}
                    isEdit={false}
                  />
                </div>
                <div className="row-span-9">
                  <ListProducts
                    products={products}
                    reloadGrid={() => loadProducts(filter)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
