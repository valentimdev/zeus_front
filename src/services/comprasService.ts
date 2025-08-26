import type { AxiosResponse } from 'axios';
import api from './api';

// Get all compras
export const getCompras = async () => {
  try {
    const response = await api.get('/api/compras');
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

// Get compra by ID
export const getCompraById = async (id: string | number) => {
  try {
    const response = await api.get(`/api/compras/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

// Create a new compra
export const createCompra = async (data: any) => {
  try {
    const response = await api.post('/api/compras/', data);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

// Update a compra
export const updateCompra = async (id: string | number, data: any) => {
  try {
    const response = await api.put(`/api/compras/${id}`, data);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

// Delete a compra
export const deleteCompra = async (id: string | number) => {
  try {
    const response = await api.delete(`/api/compras/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

// Get compra stats
export const getCompraStats = async () => {
  try {
    const response = await api.get('/api/compras/stats');
    return response;
  } catch (error) {
    console.error('Erro ao tentar fazer requisição.', error);
    throw error;
  }
};

// Get compra mes
export const getComprasPorMes = async (
  ano: number,
  mes: number
): Promise<any> => {
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
