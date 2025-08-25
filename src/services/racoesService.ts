import api from "./api";

// Get all racoes
export const getRacoes = () => api.get('/api/racoes');

// Get racao by ID
export const getRacaoById = (id: string | number) => api.get(`/api/racoes/${id}`);

// Create a new racao
export const createRacao = (data: any) => api.post('/api/racoes', data);

// Update a racao
export const updateRacao = (id: string | number, data: any) => api.put(`/api/racoes/${id}`, data);

// Delete a racao
export const deleteRacao = (id: string | number) => api.delete(`/api/racoes/${id}`);

const racoesService = {
  getRacoes,
  getRacaoById,
  createRacao,
  updateRacao,
  deleteRacao,
};
export default racoesService;