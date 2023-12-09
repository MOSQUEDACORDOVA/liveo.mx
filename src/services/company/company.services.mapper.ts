import { RegisteredCompanyRequest } from "@/types/company.types";
import { CompanySendEmail } from "./company.services.types";

export const registerCompanyMapper = (data: RegisteredCompanyRequest) => ({
  name: data.name,
  email: data.email,
  telefono: data.phoneNumber,
  dir_colonia: data.colony,
  dir_ciudad: data.city,
  tipo_sector: data.sectorType,
  sector: data.sector,
  password: data.password,
});

export const companySendEmailMapper = (data: CompanySendEmail) => ({
  email: data.email,
  nombre: data.name,
  mensaje: data.message,
});
