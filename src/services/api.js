import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Crear una instancia de Axios con un timeout de 10 segundos
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
});

// Interceptores de respuesta para manejar el error de timeout
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Manejar el error de timeout
      throw new Error(
        "Se superó el tiempo máximo de espera. Inténtalo de nuevo más tarde."
      );
    }
    return Promise.reject(error);
  }
);

// Función auxiliar para manejar respuestas exitosas
const handleSuccess = (response) => {
  if (response.data && response.data.data) {
    return response.data;
  }
  return response.data;
};

// Función auxiliar para manejar errores
const handleError = (error) => {
  if (error.response && error.response.data) {
    const errorDetails = error.response.data.data.details;

    // Extraer y concatenar los mensajes
    const errorMessages = Object.values(errorDetails)
      .map((detailArray) => detailArray[0]) // Tomar el primer mensaje de cada array
      .join(", "); // Concatenar los mensajes con una coma y un espacio

    throw new Error(errorMessages); // Lanzar un error con los mensajes concatenados
  }

  throw new Error("Error inesperado en la API.");
};

// Fetch all categories with subcategories
export const fetchCategoriesWithSubcategories = async () => {
  try {
    const response = await axiosInstance.get(
      `/categories/list_with_subcategories/`
    );
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Create new category
export const createCategory = async (name) => {
  try {
    const response = await axiosInstance.post(`/categories/`, { name });
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Update category
export const updateCategory = async (categoryId, name) => {
  try {
    const response = await axiosInstance.patch(`/categories/${categoryId}/`, {
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
    const response = await axiosInstance.delete(`/categories/${categoryId}/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Create new subcategory
export const createSubcategory = async (name, categoryId) => {
  try {
    const response = await axiosInstance.post(`/subcategories/`, {
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
    const response = await axiosInstance.patch(
      `/subcategories/${subcategoryId}/`,
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
    const response = await axiosInstance.delete(
      `/subcategories/${subcategoryId}/`
    );
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Fetch all persons
export const fetchPersons = async () => {
  try {
    const response = await axiosInstance.get(`/persons/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Create new person
export const createPerson = async (name) => {
  try {
    const response = await axiosInstance.post(`/persons/`, { name });
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Update person
export const updatePerson = async (personId, name) => {
  try {
    const response = await axiosInstance.patch(`/persons/${personId}/`, {
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
    const response = await axiosInstance.delete(`/persons/${personId}/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Fetch all contents
export const fetchContents = async () => {
  try {
    const response = await axiosInstance.get(`/contents/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Create new content
export const createContent = async (contentData) => {
  try {
    const response = await axiosInstance.post(`/contents/`, contentData);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Filter contents with query params
export const filterContents = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(`/contents/filter/?${params}`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Fetch contents with viewings
export const fetchContentsWithViewings = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(
      `/contents/with-viewings/?${params}`
    );
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Update content by id (PUT/PATCH)
export const updateContent = async (contentId, contentData) => {
  try {
    const response = await axiosInstance.patch(
      `/contents/${contentId}/`,
      contentData
    );
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};

// Delete content by id
export const deleteContent = async (contentId) => {
  try {
    const response = await axiosInstance.delete(`/contents/${contentId}/`);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};
