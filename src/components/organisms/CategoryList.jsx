import React from "react";
import CategoryItem from "../molecules/CategoryItem";

const CategoryList = (props) => {
  const { categories } = props;

  return (
    <ul className="space-y-4 mt-6">
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          category={category}
          subcategories={category.subcategories}
          {...props}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
