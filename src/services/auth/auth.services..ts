import { API, HEADERAUTH, getToken } from "@/config";
import { EditCompanyProfileRequest } from "./auth.services.types";

export const editCompanyProfile = async (body: EditCompanyProfileRequest) => {
  try {
    const { id } = body;
    // const body = registerCompanyMapper(data);

    const response = await fetch(`${API}/empresas/${id}`, {
      method: "PUT",
      headers: HEADERAUTH(getToken()),
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error al editar la empresa");
  }
};
