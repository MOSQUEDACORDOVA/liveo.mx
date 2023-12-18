import "reflect-metadata";
import { API, HEADERAUTH, getToken } from "@/config";
import { FavoriteUser, RegisteredCompanyRequest } from "@/types/company.types";
import {
  addCompanyFavoriteMapper,
  companySendEmailMapper,
} from "./company.services.mapper";
import { registerCompanyMapper } from "./company.services.mapper";
import { CategoriesServiceResponseDTO } from "./company.services.models";
import { IUser } from "@/features/LoginRegisterUser";
import {
  AddCompanyFavoriteRequest,
  CompanySendEmail,
  RemoveCompanyFavoriteRequest,
} from "./company.services.types";

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

export const getCompanies = async () => {
  try {
    const response = await fetch(`${API}/empresas`, {
      method: "GET",
      headers: HEADERAUTH(getToken()),
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw new Error("Error al obtener las empresas");
  }
};

export const searchCompanies = async (query: string): Promise<IUser[]> => {
  try {
    const response = await fetch(`${API}/empresas-buscar/${query}`, {
      method: "GET",
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw new Error("Error al obtener las empresas");
  }
};

export const companySendEmail = async (data: CompanySendEmail) => {
  try {
    const body = companySendEmailMapper(data);
    const response = await fetch(`${API}/enviar-email-contacto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error al enviar el correo");
  }
};

export const addCompanyFavorite = async (data: AddCompanyFavoriteRequest) => {
  try {
    const body = addCompanyFavoriteMapper(data);
    const response = await fetch(`${API}/fav-user`, {
      method: "POST",
      headers: HEADERAUTH(getToken()),
      body: JSON.stringify(body),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error al agregar a favoritos");
  }
};

export const deleteCompanyFavorite = async (
  data: RemoveCompanyFavoriteRequest
) => {
  try {
    const { companyId } = data;
    const response = await fetch(`${API}/fav-user/${companyId}`, {
      method: "DELETE",
      headers: HEADERAUTH(getToken()),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error("Error al agregar a favoritos");
  }
};

export const getFavorites = async (): Promise<FavoriteUser[]> => {
  try {
    const response = await fetch(`${API}/fav-user`, {
      method: "GET",
      headers: HEADERAUTH(getToken()),
    });
    const result = await response.json();

    return result.data;
  } catch (error) {
    throw new Error("Error al obtener favoritos");
  }
};
