import api from "./api";

/**
 * Fetches all pet foods.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const getRacoes = () => api.get('/api/racoes');

/**
 * Fetches a pet food by its ID.
 * @param {string | number} id - The ID of the pet food to fetch.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const getRacaoById = (id: string | number) => api.get(`/api/racoes/${id}`);

/**
 * Creates a new pet food entry.
 * @param {any} data - The data for the new pet food.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
interface Racao {
  // Define the properties of a Racao object here
  // For example:
  nome: string;
  marca: string;
  quantidade: number;
}

export const createRacao = (data: Racao) => api.post('/api/racoes', data);

/**
 * Updates an existing pet food entry.
 * @param {string | number} id - The ID of the pet food to update.
 * @param {any} data - The new data for the pet food.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const updateRacao = (id: string | number, data: Partial<Racao>) => api.put(`/api/racoes/${id}`, data);

/**
 * Deletes a pet food entry.
 * @param {string | number} id - The ID of the pet food to delete.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the API.
 */
export const deleteRacao = (id: string | number) => api.delete(`/api/racoes/${id}`);

const racoesService = {
  getRacoes,
  getRacaoById,
  createRacao,
  updateRacao,
  deleteRacao,
};
export default racoesService;