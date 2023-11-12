import { useEffect, useState } from "react";
import { getbacbaseUrl } from "../../../globals";

function Search(props: any) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectCategory, setselectedCategory] = useState(0);
  const [selectSubCategory, setselectedSubCategory] = useState(0);
  //const onFilter =

  //   useEffect(() => {
  //     fetch("https://localhost:7081/api/products")
  //       .then((response) => response.json())
  //       .then((data: any) => {
  //         console.log(data);
  //         setCategories(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });

  useEffect(() => {
    // setselectedCategory(0);
    // setselectedSubCategory(0);
    fetch("https://localhost:7081/api/categories")
      .then((response) => response.json())
      .then((data: any) => {
        //console.log(data);
        setCategories(data);
        // props.onFilter({
        //   cagtegoryId: selectCategory,
        //   subCategoryId: selectSubCategory,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCategorySelected = (e: any) => {
    setselectedCategory(e.target.value);
    console.log(e.target.value);
    fetch(
      `https://localhost:7081/api/categories/${e.target.value}/subcategories`
    )
      .then((response) => response.json())
      .then((data: any) => {
        //console.log(data);
        setselectedCategory(e.target.value);
        setSubCategories(data);
        props.onFilter({
          categoryId: e.target.value,
          subCategoryId: selectSubCategory,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubCategoryChanged = (e: any) => {
    setselectedSubCategory(e.target.value);
    props.onFilter({
      categoryId: selectCategory,
      subCategoryId: e.target.value,
    });
  };

  return (
    <div>
      Search goes here..
      <span>
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Category
        </label>
        <select
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onCategorySelected}
        >
          <option value="0">All</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </span>
      <span>
        <label
          htmlFor="subcategories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Sub Category
        </label>
        <select
          id="subcategories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onSubCategoryChanged}
        >
          <option value="0">All</option>
          {subCategories.map((subcategory: any) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.subCategoryName}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

export default Search;
