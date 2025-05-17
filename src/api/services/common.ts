// 📁 src/services/common.ts
// actualmente no en USO
import { api } from "../config/conexion";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';

export const createService = <T = any>(endpoint: string) => {
    const getAuthConfig = async () => {
      const token = await AsyncStorage.getItem('token');
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    };
  
    return {
      getAll: async (): Promise<AxiosResponse<T[]>> =>
        api.get(endpoint, await getAuthConfig()),
  
      getById: async (id: number): Promise<AxiosResponse<T>> =>
        api.get(`${endpoint}/${id}`, await getAuthConfig()),
  
      create: async (data: Partial<T>): Promise<AxiosResponse<T>> =>
        api.post(endpoint, data, await getAuthConfig()),
  
      update: async (id: number, data: Partial<T>): Promise<AxiosResponse<T>> =>
        api.put(`${endpoint}/${id}`, data, await getAuthConfig()),
  
      delete: async (id: number): Promise<AxiosResponse<void>> =>
        api.delete(`${endpoint}/${id}`, await getAuthConfig()),
    };
  };
  