import React from "react";
import CategoryItem from "../molecules/CategoryItem";

const CategoryList = (props) => {
  const { categories } = props;

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          category={category}
          subcategories={category.subcategories}
          {...props}
        />
      ))}
    </div>
  );
};

export default CategoryList;
