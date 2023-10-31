import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API, HEADERAUTH, TOKEN } from "@/config";
import { IFaqs, IService, payloadService } from "./HomeSlice";
import { toast } from "react-toastify";

type IProps = {
  service: { isLoading: boolean; error: boolean; info: IService | null };
  suscription_loading: boolean;
  suscription_by_loading: boolean;
  get_bys: { info: IGetBys[] | null; loading: boolean; error: boolean };
  testament: { info: IOneTestament | null; loading: boolean; error: boolean };
};

export type IGetBys = {
  id: string;
  fecha_fin: string;
  fecha_inicio: string;
  meses: string;
  tipo: string;
  servicio_obj: {
    logo: string;
    name: string;
    type: string;
  };
  id_testamento: string;
  obj: IOneTestament;
};

export type IOneTestament = {
  id: string;
  archivo1: string;
  archivo2: string;
  archivo3: string;
  tipo: string;
  empresa: { name: string };
};

const initialState: IProps = {
  service: { isLoading: false, error: false, info: null },
  suscription_loading: false,
  suscription_by_loading: false,
  get_bys: { info: null, loading: false, error: false },
  testament: { info: null, loading: false, error: false },
};

export const getServiceById = createAsyncThunk(
  "Service/getServiceById",
  async (id: string | number | undefined, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/servicios/${id}`, {
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    }).then((resp) => resp.json());
    return response.data;
  }
);

export type IWillServiceData = {
  texto: string | undefined;
};

export const setWill = createAsyncThunk(
  "Service/setWill",
  async (data: IWillServiceData, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/voluntad`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    return response.message;
  }
);

export type ILetterServiceData = {
  para_nombre: string | undefined;
  para_apellido: string | undefined;
  para_alias: string | undefined;
  para_relacion: string | undefined;
  comentario: string | undefined;
  cuerpo: string | undefined;
};

export const setLetter = createAsyncThunk(
  "Service/setLetter",
  async (data: ILetterServiceData, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/carta`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    return response.message;
  }
);

export type ITestament = {
  fecha_cita: string | undefined;
  hora: string | undefined;
  empresa_id: string | undefined;
  tipo: string | undefined;
};

export const setTestament = createAsyncThunk(
  "Service/setTestament",
  async (data: ITestament, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/testamento`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    return response;
  }
);

export type ISendTestamentFile = {
  id_testament: string;
  file_name: string;
  file: File;
};

export const setTestamentFile = createAsyncThunk(
  "Service/setTestamentFile",
  async (data: ISendTestamentFile, thunkAPI) => {
    const { file, id_testament, file_name } = data;
    const formData = new FormData();
    formData.append(file_name, file);
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/testamento/${id_testament}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LoginRegister.Login.info?.token ?? TOKEN}`,
      },
      body: formData,
    }).then((resp) => resp.json());
    return response.message;
  }
);

export const deleteTestamentFile = createAsyncThunk(
  "Service/deleteTestamentFile",
  async (data: { id_testament: string; file: string }, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(
      `${API}/testamento-eliminar-archivo/${data.id_testament}/${data.file}`,
      {
        method: "DELETE",
        headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      }
    ).then((resp) => resp.json());
    return response.message;
  }
);

export const getTestament = createAsyncThunk(
  "Service/getTestament",
  async (id: string, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/testamento/${id}`, {
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    }).then((resp) => resp.json());
    return response.data;
  }
);

export type ISocialMedia = {
  facebook: string | undefined;
  tiktok: string | undefined;
  instagram: string | undefined;
};

export const setSocialMedia = createAsyncThunk(
  "Service/setSocialMedia",
  async (data: ISocialMedia, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/redes_sociales`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    return response.message;
  }
);

export type IBy = {
  servicio_id: string | number | undefined;
  monto: string | undefined;
  fecha_inicio: string | undefined;
  id_metodo_pago: string | number | undefined;
  tipo: string | undefined;
  id_testamento: string;
};

export const setBy = createAsyncThunk(
  "Service/setBy",
  async (data: IBy, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/compras`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    return response.message;
  }
);

export const getBys = createAsyncThunk(
  "Service/getBys",
  async (_, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/compras`, {
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    }).then((resp) => resp.json());
    return response.data;
  }
);

export const Service = createSlice({
  name: "Service",
  initialState,
  reducers: {
    resetError: (state) => {
      state.service.error = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteTestamentFile.pending, (state) => {
        state.testament.loading = true;
      })
      .addCase(deleteTestamentFile.rejected, (state) => {
        state.testament.error = true;
        state.testament.loading = false;
      })
      .addCase(setTestamentFile.pending, (state) => {
        state.testament.loading = true;
      })
      .addCase(setTestamentFile.rejected, (state) => {
        state.testament.error = true;
        state.testament.loading = false;
      })
      .addCase(getTestament.pending, (state) => {
        state.testament.loading = true;
      })
      .addCase(getTestament.rejected, (state) => {
        state.testament.error = true;
        state.testament.loading = false;
      })
      .addCase(getTestament.fulfilled, (state, action) => {
        state.testament.error = false;
        state.testament.loading = false;
        state.testament.info = action.payload;
      })
      .addCase(getBys.pending, (state) => {
        state.get_bys.loading = true;
      })
      .addCase(getBys.rejected, (state) => {
        state.get_bys.error = true;
        state.get_bys.loading = false;
      })
      .addCase(getBys.fulfilled, (state, action) => {
        state.get_bys.error = false;
        state.get_bys.loading = false;
        state.get_bys.info = action.payload;
      })
      .addCase(setBy.pending, (state) => {
        state.suscription_by_loading = true;
      })
      .addCase(setBy.rejected, (state) => {
        toast.error("Hubo algun error y no pudimos proseguir con su compra");
        state.suscription_by_loading = false;
      })
      .addCase(setBy.fulfilled, (state, action) => {
        toast.success(action.payload);
        state.suscription_by_loading = false;
      })
      .addCase(setSocialMedia.pending, (state) => {
        state.suscription_loading = true;
      })
      .addCase(setSocialMedia.rejected, (state) => {
        toast.error("No pudimos crear sus redes sociales");
        state.suscription_loading = false;
      })
      .addCase(setSocialMedia.fulfilled, (state, action) => {
        toast.success(action.payload);
        state.suscription_loading = false;
      })
      .addCase(setTestament.pending, (state) => {
        state.suscription_loading = true;
      })
      .addCase(setTestament.rejected, (state) => {
        toast.error("No pudimos crear su testamento");
        state.suscription_loading = false;
      })
      .addCase(setTestament.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.suscription_loading = false;
      })
      .addCase(setWill.pending, (state) => {
        state.suscription_loading = true;
      })
      .addCase(setWill.rejected, (state) => {
        toast.error("No pudimos crear sus voluntades");
        state.suscription_loading = false;
      })
      .addCase(setWill.fulfilled, (state, action) => {
        toast.success(action.payload);
        state.suscription_loading = false;
      })
      .addCase(setLetter.pending, (state) => {
        state.suscription_loading = true;
      })
      .addCase(setLetter.rejected, (state) => {
        toast.error("No pudimos crear su carta");
        state.suscription_loading = false;
      })
      .addCase(setLetter.fulfilled, (state, action) => {
        toast.success(action.payload);
        state.suscription_loading = false;
      })
      .addCase(getServiceById.pending, (state) => {
        state.service.isLoading = true;
      })
      .addCase(getServiceById.rejected, (state) => {
        state.service.error = true;
        state.service.isLoading = false;
      })
      .addCase(
        getServiceById.fulfilled,
        (state, action: { payload: payloadService }) => {
          const item = action.payload;
          const faqs: IFaqs[] = [];
          item.preguntas_frecuentes.map(
            (faq: { pregunta: string; respuesta: string }) =>
              faqs.push({ quest: faq.pregunta, response: faq.respuesta })
          );
          state.service.error = true;
          state.service.isLoading = false;
          state.service.info = {
            faqs,
            gallery: item.imgs,
            how_work: item.how_work,
            id: item.id,
            imgPrincipal: item.img_principal,
            logo: item.logo,
            longDescription: item.descrip_larga,
            name: item.name,
            services: item.services,
            shortDescription: item.descrip_corta,
            vidio_url: item.vidio_url,
            price_month: item.precio_mes,
            type: item.tipo,
            pdf_acceptance: item.formato.url_pdf,
            pdf_advance_directive: item.formato.url_pdf_voluntad_anticipada,
            pdf_inheritance: item.formato.url_pdf_aceptacion_herencia,
          };
        }
      );
  },
});
export const { resetError } = Service.actions;

export const selectServiceInfo = (state: RootState) =>
  state.Service.service.info;
export const selectServiceLoading = (state: RootState) =>
  state.Service.service.isLoading;
export const selectServiceError = (state: RootState) =>
  state.Service.service.error;
export const selectBysInfo = (state: RootState) => state.Service.get_bys.info;
export const selectBysLoading = (state: RootState) =>
  state.Service.get_bys.loading;
export const selectBysError = (state: RootState) => state.Service.get_bys.error;
export const selectServiceSubsLoading = (state: RootState) =>
  state.Service.suscription_loading;
export const selectServiceSubsByLoading = (state: RootState) =>
  state.Service.suscription_by_loading;
export const selectTestamentInfo = (state: RootState) =>
  state.Service.testament.info;
export const selectTestamentLoading = (state: RootState) =>
  state.Service.testament.loading;
export const selectTestamentError = (state: RootState) =>
  state.Service.testament.error;
