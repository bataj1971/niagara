import { Address } from "./AddressModel";

export interface CustomerModel {
  id: number;
  name: string;
  email: string;
  description?: string;
  customer_category_id?: number;
  customertype?:string;
  created_at: string;
  modified_at?: string;
  address_id?: number;
  shipping_address_id?: number;
  address?: Address;
  shipping_address?: Address;
}