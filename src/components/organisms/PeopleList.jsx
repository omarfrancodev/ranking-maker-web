import React from "react";
import PersonItem from "../molecules/PersonItem";

const PeopleList = (props) => {
  const { persons } = props;

  return (
    <ul className="space-y-4 mt-6">
      {persons.map((person) => (
        <PersonItem key={person.name} person={person} {...props} />
      ))}
    </ul>
  );
};

export default PeopleList;
