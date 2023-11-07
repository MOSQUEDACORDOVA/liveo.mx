import { API, HEADERAUTH, TOKEN } from "@/config";
import { RegisteredCompanyRequest } from "@/types/company.types";
import { registerCompanyMapper } from "./company.services.mapper";

export const registerCompany = async (data: RegisteredCompanyRequest) => {
  try {
    const body = registerCompanyMapper(data);

    const response = await fetch(`${API}/empresas`, {
      method: "POST",
      headers: HEADERAUTH(TOKEN),
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error al registrar la empresa");
  }
};
