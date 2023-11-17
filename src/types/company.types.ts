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
