import axios from "axios";

const CONTENT_API_KEY = process.env.REACT_APP_CONTENT_API_KEY;

const CONTENT_API_URL = process.env.REACT_APP_CONTENT_API_URL;

const paramAPIKey = `?apikey=${CONTENT_API_KEY}`;

const axiosInstance = axios.create({
  baseURL: CONTENT_API_URL,
  timeout: 10000, // 10 segundos
});

// Interceptores de respuesta para manejar el error de timeout
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      // Manejar el error de solicitud cancelada
      return Promise.reject(new Error("La solicitud fue cancelada."));
    } else if (error.message && error.message.includes("timeout")) {
      // Manejar el error de timeout
      return Promise.reject(
        new Error(
          "Se superó el tiempo máximo de espera. Inténtalo de nuevo más tarde."
        )
      );
    }
    // Manejar otros tipos de errores
    return Promise.reject(error);
  }
);

// Función para extraer el título antes de los paréntesis
const extractTitleBeforeParenthesis = (title) => {
  // Buscar el contenido antes de los paréntesis
  const match = title.match(/^(.*?)\s*\(/);
  return match ? match[1].trim() : title; // Si hay paréntesis, usar el texto antes, sino, usar todo el título
};

// Función para reemplazar los espacios por '+'
const formatTitleForQuery = (title) => {
  return title.replace(/\s+/g, "+"); // Reemplaza todos los espacios por "+"
};

// Fetch content data by title (con ajuste para los paréntesis)
export const fetchContentDataByTitle = async (query, year = null) => {
  try {
    // Extraer el título antes de los paréntesis, si existe
    const titleToSearch = extractTitleBeforeParenthesis(query);

    // Reemplazar espacios por "+"
    const formattedTitle = formatTitleForQuery(titleToSearch);

    let fullQuery = `${paramAPIKey}&t=${formattedTitle}&plot=full`;
    if (year !== null) {
      fullQuery += `&y=${year}`;
    }

    // Realizar la solicitud a la API con el título formateado
    const response = await axiosInstance.get(fullQuery);
    console.log(response);
    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Fetch content data by ID
export const fetchContentDataById = async (id) => {
  try {
    const formattedId = encodeURIComponent(id); // Asegurarse de que el ID esté correctamente codificado
    const response = await axiosInstance.get(`${paramAPIKey}&i=${formattedId}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
