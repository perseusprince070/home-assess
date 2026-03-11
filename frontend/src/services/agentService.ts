import axios, { AxiosError } from 'axios';
import type { PropertyAgent, CreateAgentDto, UpdateAgentDto, ApiResponse } from '@/types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

function handleError(err: unknown): never {
  if (err instanceof AxiosError) {
    const msg = err.response?.data?.error || err.response?.data?.message || err.message;
    throw new Error(msg);
  }
  throw err;
}

export const agentService = {
  async getAll(): Promise<ApiResponse<PropertyAgent[]>> {
    try {
      const { data } = await api.get<ApiResponse<PropertyAgent[]>>('/agents');
      return data;
    } catch (err) {
      handleError(err);
    }
  },

  async getById(id: string): Promise<ApiResponse<PropertyAgent>> {
    try {
      const { data } = await api.get<ApiResponse<PropertyAgent>>(`/agents/${id}`);
      return data;
    } catch (err) {
      handleError(err);
    }
  },

  async create(dto: CreateAgentDto): Promise<ApiResponse<PropertyAgent>> {
    try {
      const { data } = await api.post<ApiResponse<PropertyAgent>>('/agents', dto);
      return data;
    } catch (err) {
      handleError(err);
    }
  },

  async update(id: string, dto: UpdateAgentDto): Promise<ApiResponse<PropertyAgent>> {
    try {
      const { data } = await api.put<ApiResponse<PropertyAgent>>(`/agents/${id}`, dto);
      return data;
    } catch (err) {
      handleError(err);
    }
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await api.delete<ApiResponse<null>>(`/agents/${id}`);
      return data;
    } catch (err) {
      handleError(err);
    }
  },
};
