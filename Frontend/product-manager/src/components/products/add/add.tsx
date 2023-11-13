import React from "react";
import { Product } from "../../../models/product";
import { getbackendbaseUrl } from "../../../globals";
import { Category } from "../../../models/category";
import { SubCategory } from "../../../models/subCategory";

export default function AddProduct(props: any) {
  const [showModal, setShowModal] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [subCategories, setSubCategories] = React.useState<SubCategory[]>([]);
  const imageSampleUrl = "https://picsum.photos/200/300";

  const [currentProduct, setcurrentProduct] = React.useState<Product>({
    id: 0,
    name: "",
    description: "",
    categoryId: 1,
    subCategoryId: 1,
    price: 0,
    quantity: 0,
    productCode: "",
    ImageUrl: imageSampleUrl,
  });

  React.useEffect(() => {
    loadCategories(true);

    if (props.isEdit === true) {
      fetch(`${getbackendbaseUrl()}/api/products/${props.id}`)
        .then((response) => response.json())
        .then((data: Product) => {
          console.log("SetIntial Data");
          console.log(data);
          setcurrentProduct(data);
          loadSubCategories(data.categoryId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleChange = (e: any, statePropName: string) => {
    setcurrentProduct({ ...currentProduct, [statePropName]: e.target.value });
  };

  const onCategorySelected = (e: any) => {
    setcurrentProduct({ ...currentProduct, categoryId: e.target.value });
    loadSubCategories(e.target.value);
  };

  const loadCategories = (isInintialize: boolean) => {
    fetch(`${getbackendbaseUrl()}/api/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategories(data);
        if (isInintialize && props.isEdit === false) {
          setcurrentProduct({ ...currentProduct, categoryId: data[0].id });
          loadSubCategories(data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSubCategories = (selectedCategory: number) => {
    fetch(
      `${getbackendbaseUrl()}/api/categories/${selectedCategory}/subcategories`
    )
      .then((response) => response.json())
      .then((data: any) => {
        setSubCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubCategoryChanged = (e: any) => {
    setcurrentProduct({ ...currentProduct, subCategoryId: e.target.value });
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const submitForm = () => {
    var inputObj = {
      categoryId: currentProduct.categoryId,
      subCategoryId: currentProduct.subCategoryId,
      quantity: currentProduct.quantity,
      price: currentProduct.price,
      description: currentProduct.description,
      productCode: currentProduct.productCode,
      imageUrl: imageSampleUrl,
      name: currentProduct.name,
      id: props.id,
    };

    var url = `${getbackendbaseUrl()}/api/products`;
    var method = "POST";
    if (props.isEdit) {
      url = `${getbackendbaseUrl()}/api/products/${props.id}`;
      method = "PUT";
    }
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(inputObj),
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log(data);
        setShowModal(false);
        props.reloadGrid();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {props.label}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-gray text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed"></p>

                  <form className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Product Code
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={currentProduct.productCode}
                          onChange={(e) => handleChange(e, "productCode")}
                        ></input>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Product Name
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={currentProduct.name}
                          onChange={(e) => handleChange(e, "name")}
                        ></input>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Description
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={currentProduct.description}
                          onChange={(e) => handleChange(e, "description")}
                        ></input>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Quantity
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={currentProduct.quantity}
                          onChange={(e) => handleChange(e, "quantity")}
                        ></input>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Price
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={currentProduct.price}
                          onChange={(e) => handleChange(e, "price")}
                        ></input>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Category
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <select
                          id="categories"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={onCategorySelected}
                          value={currentProduct.categoryId}
                        >
                          {categories.map((category: any) => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          SubCategory
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <select
                          id="subcategories"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={onSubCategoryChanged}
                          value={currentProduct.subCategoryId}
                        >
                          {subCategories.map((subcategory: any) => (
                            <option key={subcategory.id} value={subcategory.id}>
                              {subcategory.subCategoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Discard
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={submitForm}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
