import React, { useState, useEffect } from "react";
import "./list.css";

function ListProducts() {
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
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => {
            return (
              <tr
                className={
                  "bg-white border-b " +
                  (product.quantity > 10
                    ? "dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    : "dark:bg-red-800 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-600")
                }
                key={product.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListProducts;
