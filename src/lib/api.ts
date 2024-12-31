import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const createPosition = (data: any) => api.post('/positions', { position: data });

export const getPositions = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `/positions?${query}`;
    return await api.get(url);
  };
  
  
export const getPosition = (id: number) => api.get(`/positions/${id}`); // Obtener una posición por ID

export const updatePosition = (id: number, data: any) =>
  api.put(`/positions/${id}`, { position: data }); // Actualizar una posición

export const deletePosition = (id: number) => api.delete(`/positions/${id}`);
