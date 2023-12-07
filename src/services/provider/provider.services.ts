import { API, HEADERAUTH, getToken } from "@/config";
import { IUser } from "@/features/LoginRegisterUser";
import "reflect-metadata";

export const getProvider = async (id: number): Promise<IUser> => {
  try {
    const response = await fetch(`${API}/empresas/${id}`, {
      method: "GET",
      headers: HEADERAUTH(getToken()),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error al obtener la empresa");
  }
};

export const getProviderByUrl = async (url: string): Promise<IUser> => {
  try {
    const response = await fetch(`${API}/empresas-by-name/${url}`, {
      method: "GET",
      headers: HEADERAUTH(getToken()),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error al obtener la empresa");
  }
};
