import React, { useState, useEffect } from "react";
import "./list.css";
import AddProduct from "../add/add";
import { Product } from "../../../models/product";

function ListProducts(props: any) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product code
            </th>
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
              Category Id
            </th>
            <th scope="col" className="px-6 py-3">
              Sub CategoryId
            </th>
            <th scope="col" className="px-6 py-3">
              Image Url
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product: Product) => {
            return (
              <tr
                className={
                  "bg-white border-b " +
                  (product.quantity < 10
                    ? "dark:bg-red-800 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-600"
                    : product.quantity >= 10 && product.quantity <= 100
                    ? "dark:bg-yellow-800 dark:border-yellow-700 hover:bg-yello-50 dark:hover:bg-yellow-600"
                    : "dark:bg-green-800 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-600")
                }
                key={product.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.productCode}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.categoryId}</td>
                <td className="px-6 py-4">{product.subCategoryId}</td>
                <td className="px-6 py-4">
                  <img alt="preview" src={product.ImageUrl}></img>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <AddProduct
                    isEdit={true}
                    id={product.id}
                    label={"Edit"}
                    reloadGrid={props.reloadGrid}
                  />
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
