// src/components/organisms/ContentList.jsx
import React from "react";
import ContentItem from "../molecules/ContentItem";

const ContentList = ({ shows, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {shows.map((show) => (
        <ContentItem
          key={show.id}
          show={show}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContentList;
