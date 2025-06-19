export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Meal {
  _id: string;
  name: string;
  calories: number;
  userId: string;
  date: string;
  createdAt: string;
}

export interface Water {
  _id: string;
  amount: number;
  userId: string;
  date: string;
  createdAt: string;
}

export interface Goal {
  _id: string;
  calories: number;
  water: number;
  userId: string;
  createdAt: string;
}

export interface Doc {
  _id: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
} 