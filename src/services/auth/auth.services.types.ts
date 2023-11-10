import { RegisteredCompanyRequest } from "@/types/company.types";

export interface LoginData {
  email: string;
  password: string;
}

export interface EditCompanyProfileRequest extends RegisteredCompanyRequest {
  avatar?: string;
}
