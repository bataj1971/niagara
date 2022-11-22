export interface ArticleModel {
  id: string;
  name: string;
  ean?: string;
  unit?: string;
  unitarticle_category_id?: number;
  price?: number;
  description?: string;
  suplier_customer_id?: number;
  manufacturer_customer_id?: number;
  created_by?: number;
  modified_by?: number;
  created_at?: string;
  modified_at?: string;
}