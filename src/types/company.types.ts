import { IUser } from "@/features/LoginRegisterUser";

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

export interface FavoriteUser {
  created_at: string;
  id: number;
  user_id: number;
  fav_obj: IUser;
  fav_id: number;
}
