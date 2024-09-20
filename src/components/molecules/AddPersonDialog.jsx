import Dialog from "../atoms/Dialog";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const AddPersonDialog = ({
  isOpen,
  onClose,
  handleAddNew,
  newPersonName,
  setNewPersonName,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setNewPersonName("");
      }}
      title="Agregar nueva Persona"
      description="Agregue una nueva persona para poder interactuar en la app"
    >
      <Input
        label="Nombre de la Persona"
        value={newPersonName}
        onChange={(e) => setNewPersonName(e.target.value)}
      />

      <div className="flex justify-center w-full">
        <Button className="bg-success text-white" onClick={handleAddNew}>
          Guardar
        </Button>
      </div>
    </Dialog>
  );
};

export default AddPersonDialog;
