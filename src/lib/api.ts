import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate de que este sea el endpoint correcto de tu API Rails
});

export const createPosition = (data: any) => api.post('/positions', { position: data });

export const getPositions = () => api.get('/positions'); // Endpoint para obtener todas las posiciones

export const getPosition = (id: number) => api.get(`/positions/${id}`); // Obtener una posición por ID

export const updatePosition = (id: number, data: any) =>
  api.put(`/positions/${id}`, { position: data }); // Actualizar una posición

export const deletePosition = (id: number) => api.delete(`/positions/${id}`);
