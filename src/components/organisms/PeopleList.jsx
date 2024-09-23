import React from "react";
import PersonItem from "../molecules/Persons/PersonItem";

const PeopleList = (props) => {
  const { persons } = props;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 mt-4">
      {persons.map((person) => (
        <PersonItem key={person.name} person={person} {...props} />
      ))}
    </div>
  );
};

export default PeopleList;
