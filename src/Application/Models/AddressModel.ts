
export interface Address {
  id: number;
  parent?: string;
  name?: string;
  country: string;
  city: string;
  street?: string;
  zipcode?: string;
  state?: string;
  description?: string;
  created_by?: number;
  modified_by?: number;
  created_at?: string;
  modified_at?: string;
}