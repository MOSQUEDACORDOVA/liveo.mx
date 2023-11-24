import "reflect-metadata";
import { API, HEADERAUTH, getToken } from "@/config";
import { RegisteredCompanyRequest } from "@/types/company.types";
import { registerCompanyMapper } from "./company.services.mapper";
import { CategoriesServiceResponseDTO } from "./company.services.models";

export const registerCompany = async (data: RegisteredCompanyRequest) => {
  try {
    const body = registerCompanyMapper(data);

    const response = await fetch(`${API}/empresas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error al registrar la empresa");
  }
};

export const getCategoriesServices = async () => {
  try {
    const response = await fetch(`${API}/categorias_empresa`, {
      method: "GET",
      headers: HEADERAUTH(getToken()),
    });
    const data = await response.json();
    const result = new CategoriesServiceResponseDTO().fromJSON(data);

    return result.data ?? [];
  } catch (error) {
    throw new Error("Error al obtener las categorias");
  }
};
