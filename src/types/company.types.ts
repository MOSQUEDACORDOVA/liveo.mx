export interface RegisteredCompanyRequest {
  name: string;
  city: string;
  colony: string;
  sectorType: string;
  sector: string;
  email: string;
  phoneNumber: string;
  userName: string;
  password: string;
  privacy?: boolean;
}
