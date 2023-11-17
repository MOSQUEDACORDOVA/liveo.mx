import { API, HEADERAUTH, getToken } from "@/config";

export const getCompaniesImages = async () => {
  try {
    const response = await fetch(`${API}/empresas-img/`, {
      headers: HEADERAUTH(getToken()),
    }).then((resp) => resp.json());

    return response;
  } catch (error) {
    throw new Error("Error al obtener los documentos");
  }
};
