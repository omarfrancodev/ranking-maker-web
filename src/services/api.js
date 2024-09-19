import axios from "axios";

const API_URL = "https://ranking-maker.onrender.com/api";

// Función auxiliar para manejar respuestas exitosas
const handleSuccess = (response) => {
  if (response.data && response.data.data) {
    console.log(response.data.data); // Imprimir en consola el valor de response.data.data
  }
  return response.data;
};

// Función auxiliar para manejar errores
const handleError = (error) => {
  if (error.response && error.response.data) {
    const errorDetails = error.response.data.data.details;
    throw new Error(JSON.stringify(errorDetails)); // Lanzar un error con el mensaje `details`
  }
  throw new Error("Error inesperado en la API.");
};

// Fetch all categories with subcategories
export const fetchCategoriesWithSubcategories = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/categories/list_with_subcategories/`
    );
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Create new category
export const createCategory = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/categories/`, { name });
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Update category
export const updateCategory = async (categoryId, name) => {
  try {
    const response = await axios.patch(`${API_URL}/categories/${categoryId}/`, {
      name,
    });
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Delete category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${categoryId}/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Create new subcategory
export const createSubcategory = async (name, categoryId) => {
  try {
    const response = await axios.post(`${API_URL}/subcategories/`, {
      name,
      category: categoryId,
    });
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Update subcategory
export const updateSubcategory = async (subcategoryId, name) => {
  try {
    const response = await axios.patch(
      `${API_URL}/subcategories/${subcategoryId}/`,
      { name }
    );
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Delete subcategory
export const deleteSubcategory = async (subcategoryId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/subcategories/${subcategoryId}/`
    );
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Fetch all persons
export const fetchPersons = async () => {
  try {
    const response = await axios.get(`${API_URL}/persons/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Create new person
export const createPerson = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/persons/`, { name });
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Update person
export const updatePerson = async (personId, name) => {
  try {
    const response = await axios.patch(`${API_URL}/persons/${personId}/`, {
      name,
    });
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Delete person
export const deletePerson = async (personId) => {
  try {
    const response = await axios.delete(`${API_URL}/persons/${personId}/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};