import React from "react";
import CategoryItem from "../molecules/Categories/CategoryItem";

const CategoryList = React.memo((props) => {
  const { categories } = props;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 mt-4 auto-rows-min">
      {categories.map((category) => (
        <CategoryItem
          key={category.id} // Usar `id` como key es una mejor práctica
          category={category}
          {...props}
        />
      ))}
    </div>
  );
});

export default CategoryList;
