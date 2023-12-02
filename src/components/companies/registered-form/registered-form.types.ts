import { RegisteredCompanyRequest } from "@/types/company.types";

export interface RegisteredFormValues extends RegisteredCompanyRequest {
  prefix: string;
}
