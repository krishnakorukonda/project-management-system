import { useEffect, useState } from "react";
import { getbackendbaseUrl } from "../../../globals";

function Search(props: any) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectCategory, setselectedCategory] = useState<number>(0);
  const [selectSubCategory, setselectedSubCategory] = useState<number>(0);

  useEffect(() => {
    fetch("https://localhost:7081/api/categories")
      .then((response) => response.json())
      .then((data: any) => {
        setCategories(data);
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
        setselectedCategory(parseInt(e.target.value));
        setSubCategories(data);
        props.onFilter({
          categoryId: parseInt(e.target.value),
          subCategoryId: 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubCategoryChanged = (e: any) => {
    setselectedSubCategory(parseInt(e.target.value));
    props.onFilter({
      categoryId: selectCategory,
      subCategoryId: parseInt(e.target.value),
    });
  };

  return (
    <div>
      <span>
        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray py-2 px-2"
        >
          Select Category
        </label>
        <select
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2"
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
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray py-2 px-2"
        >
          Select Sub Category
        </label>
        <select
          id="subcategories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2"
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
