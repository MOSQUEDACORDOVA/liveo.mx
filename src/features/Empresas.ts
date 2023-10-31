import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API, HEADERAUTH, TOKEN } from "@/config";

export type IEmpresas = {
  id: number | string;
  name: string;
  apellido: null | string;
  email: string;
  password: string;
  avatar: string;
  logo: string;
  estado: "Activo" | "Inactivo";
  telefono: null | string | number;
  celular: null | string | number;
  roles: [];
  slogan: string;
  descripcion: string;
  web_site: string;
  dir_calle: string;
  dir_colonia: string;
  dir_ciudad: string;
  dir_postal: null | string;
  dir_pais: string;
  url_facebook: string;
  url_instagram: string;
  url_tiktok: string;
  imagen_principal_empresa: null | string;
  imagenes_empresa: string[];
};

type IIProps = {
  companies: IEmpresas[];
  loading: boolean;
  error: boolean;
  notarys: { id: string; name: string }[];
};

const initialState: IIProps = {
  companies: [],
  error: false,
  loading: false,
  notarys: [],
};

export const getEmpresas = createAsyncThunk(
  "getEmpresas/Empresas",
  async () => {
    const response = await fetch(`${API}/empresas`).then((res) => res.json());
    return response.data;
  }
);

export const getNotarys = createAsyncThunk(
  "Service/getNotarys",
  async (_, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/empresas-buscar/notaria`, {
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    }).then((resp) => resp.json());
    return response.data;
  }
);

export const Empresas = createSlice({
  name: "Empresas",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNotarys.fulfilled, (state, action) => {
        state.notarys = action.payload;
      })
      .addCase(getEmpresas.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(getEmpresas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmpresas.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectNotarys = (state: RootState) => state.Empresas.notarys;
export const selectCompanies = (state: RootState) => state.Empresas.companies;
export const selectCompaniesLoading = (state: RootState) =>
  state.Empresas.loading;
export const selectCompaniesError = (state: RootState) => state.Empresas.error;
