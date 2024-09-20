import Dialog from "../atoms/Dialog";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Button from "../atoms/Button";

const AddCategoryDialog = ({
  isOpen,
  onClose,
  categories,
  handleAddNew,
  newItemType,
  setNewItemType,
  newCategoryName,
  setNewCategoryName,
  newSubcategoryName,
  setNewSubcategoryName,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setNewCategoryName("");
        setNewSubcategoryName("");
        setSelectedCategory("");
      }}
      title="Agregar nueva Categoría o Subcategoría"
      description="Escoja el tipo que desee"
    >
      <Select
        label="Selecciona un tipo"
        value={newItemType}
        onChange={setNewItemType}
        options={["Categoría", "Subcategoría"]}
      />

      {newItemType === "Categoría" ? (
        <Input
          label="Nombre de la Categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      ) : (
        <>
          <Select
            label="Seleccionar Categoría"
            value={selectedCategory} // Debe ser el id de la categoría
            onChange={setSelectedCategory} // Asignar directamente el id sin acceder a `target.value`
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id, // Asegúrate de usar el id correcto de la categoría
            }))}
          />

          <Input
            label="Nombre de la Subcategoría"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
          />
        </>
      )}
      <div className="flex justify-center w-full">
        <Button className="bg-success text-white" onClick={handleAddNew}>
          Guardar
        </Button>
      </div>
    </Dialog>
  );
};

export default AddCategoryDialog;
