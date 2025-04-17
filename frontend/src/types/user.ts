export interface User {
  _id?: string;
  user: string;
  email: string;
  mobile: number;
  age: number;
  interest: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserFormData {
  _id?: string;
  user: string;
  email: string;
  mobile: number;
  age: number;
  interest: string[];
}
