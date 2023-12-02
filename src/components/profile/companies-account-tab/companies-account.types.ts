import { Dayjs } from "dayjs";

export default interface CompaniesAccountValues {
  name: string;
  apellido: string;
  celular: string;
  email: string;
  dir_ciudad?: string;
  dir_colonia?: string;
  dir_pais?: string;
  telefono?: string;
  dir_calle?: string;
  dir_postal?: string;
  nacimiento?: string | Dayjs;
  web_site?: string;
  descripcion?: string;
}
