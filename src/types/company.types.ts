export interface RegisteredCompanyRequest {
  id?: number;
  name: string;
  city: string;
  colony: string;
  sectorType: string;
  sector: string;
  email: string;
  phoneNumber: string;
  password: string;
  privacy?: boolean;
}

export interface CompanyImage {
  created_at: string;
  id: number;
  tipo?: string;
  updated_at: string;
  url: string;
  user_id: string;
}
