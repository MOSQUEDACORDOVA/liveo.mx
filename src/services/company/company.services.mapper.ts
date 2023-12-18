import { RegisteredCompanyRequest } from "@/types/company.types";
import { AddCompanyFavoriteRequest } from "./company.services.types";
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
  texto: data.message,
});

export const addCompanyFavoriteMapper = (data: AddCompanyFavoriteRequest) => ({
  fav_id: data.companyId,
});
