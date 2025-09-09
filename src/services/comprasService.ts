import api from './api';

/**
 * Fetches all purchases.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const getCompras = async () => {
  try {
    const response = await api.get('/api/compras');
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

/**
 * Fetches a purchase by its ID.
 * @param {string | number} id - The ID of the purchase to fetch.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const getCompraById = async (id: string | number) => {
  try {
    const response = await api.get(`/api/compras/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

/**
 * Creates a new purchase.
 * @param {any} data - The data for the new purchase.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
interface Compra {
  categoria: string;
  valorPago: string | number | undefined;
  data: string;
}

export const createCompra = async (data: Compra) => {
  try {
    const response = await api.post('/api/compras/', data);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

/**
 * Updates an existing purchase.
 * @param {string | number} id - The ID of the purchase to update.
 * @param {any} data - The new data for the purchase.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const updateCompra = async (id: string | number, data: Partial<Compra>) => {
  try {
    const response = await api.put(`/api/compras/${id}`, data);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

/**
 * Deletes a purchase.
 * @param {string | number} id - The ID of the purchase to delete.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const deleteCompra = async (id: string | number) => {
  try {
    const response = await api.delete(`/api/compras/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

/**
 * Fetches purchase statistics.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const getCompraStats = async () => {
  try {
    const response = await api.get('/api/compras/stats');
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

/**
 * Fetches purchases for a specific month and year.
 * @param {number} ano - The year.
 * @param {number} mes - The month.
 * @returns {Promise<any>} A promise that resolves with the response data from the API.
 */
export const getComprasPorMes = async (
  ano: number,
  mes: number
): Promise<Compra[]> => {
  try {
    const response = await api.get(
      `/api/compras/compras-mes?ano=${ano}&mes=${mes}`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

const comprasService = {
  getCompras,
  getCompraById,
  createCompra,
  updateCompra,
  deleteCompra,
  getCompraStats,
  getComprasPorMes,
};

export default comprasService;
