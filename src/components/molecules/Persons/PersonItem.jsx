import React from "react";
import { Edit, Trash, Save, X } from "lucide-react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

const PersonItem = ({
  person,
  editPerson,
  handleEditPerson,
  handleSavePerson,
  cancelEditPerson,
  handleDeletePerson,
  ...personProps
}) => {
  return (
    <div key={person.id} className="shadow rounded-lg">
      <div
        className={`flex justify-between p-2 items-center
        }`}
      >
        {editPerson === person.name ? (
          <Input
            value={personProps.newPersonName}
            onChange={(e) => personProps.setNewPersonName(e.target.value)}
            className="mr-4"
            placeholder={personProps.newPersonName}
          />
        ) : (
          <div className="flex items-center">
            <span className="font-semibold">{person.name}</span>
          </div>
        )}

        <div className="flex space-x-1 items-center">
          <Button
            className="bg-transparent hover:bg-blue-400 text-blue-700 hover:text-white p-2 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              if (editPerson === person.name) {
                handleSavePerson(person.name, person.id);
              } else {
                handleEditPerson(person.name);
              }
            }}
          >
            {editPerson === person.name ? (
              <Save className="w-5 h-5" />
            ) : (
              <Edit className="w-5 h-5" />
            )}
          </Button>
          <Button
            className="bg-transparent hover:bg-red-500 text-red-800 hover:text-white p-2 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              if (editPerson === person.name) {
                cancelEditPerson();
              } else {
                handleDeletePerson(person.id, person.name);
              }
            }}
          >
            {editPerson === person.name ? (
              <X className="w-5 h-5" />
            ) : (
              <Trash className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonItem;
