import type { AxiosResponse } from "axios";
import api from "./api";

// Get all compras
export const getCompras = () => api.get('/api/compras');

// Get compra by ID
export const getCompraById = (id: string | number) => api.get(`/api/compras/${id}`);

// Create a new compra
export const createCompra = (data: any) => api.post('/api/compras/', data);

// Update a compra
export const updateCompra = (id: string | number, data: any) => api.put(`/api/compras/${id}`, data);

// Delete a compra
export const deleteCompra = (id: string | number) => api.delete(`/api/compras/${id}`);

// Get compra stats
export const getCompraStats = () => api.get('/api/compras/stats');

// Get compra mes
export const getComprasPorMes = async (ano:number, mes:number): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    const response = await api.get(`api/compras/compras-mes?ano=${ano}&mes=${mes}`);
    // console.log('Requisicao ->', response);
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
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