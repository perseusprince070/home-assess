export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentDto {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export type UpdateAgentDto = Partial<CreateAgentDto>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}
