import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API, HEADERAUTH, TOKEN } from "@/config";
import { toast } from "react-toastify";
import { getFiles } from "./LoginRegisterUser";

type ISliders = {
  id: number;
  slide: string;
  title: string;
  subtitle: string;
  description: string;
};

type ITestimonials = {
  id: number;
  name: string;
  avatar: string;
  description: string;
};

export interface IService extends IInsideService {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  logo: string;
  imgPrincipal: string;
  pdf_acceptance?: string;
  pdf_inheritance?: string;
  pdf_advance_directive?: string;
}

type IProps = {
  testimonials: {
    isLoading: boolean;
    error: boolean;
    info: ITestimonials[];
  };
  sliders: {
    isLoading: boolean;
    error: boolean;
    info: ISliders[];
  };
  services: {
    isLoading: boolean;
    error: boolean;
    info: IService[];
  };
  show_report_deceased: boolean;
  amount_pay_report_deceased_person: string;
};

export type IFaqs = {
  quest: string;
  response: string;
};

type IInsideService = {
  how_work: IFaqs;
  services: string[];
  vidio_url: string[];
  gallery: [];
  faqs: IFaqs[];
  price_month: string;
  type: IService_type;
};

type IService_type =
  | "Voluntades"
  | "Testamento"
  | "Carta"
  | "Redes Sociales"
  | "General";

const initialState: IProps = {
  testimonials: { isLoading: false, error: false, info: [] },
  sliders: { isLoading: false, error: false, info: [] },
  services: { isLoading: false, error: false, info: [] },
  show_report_deceased: false,
  amount_pay_report_deceased_person: "",
};

export const SlidersData = createAsyncThunk("Home/SlidersData", async () => {
  const response = await fetch(`${API}/slider`, {
    headers: HEADERAUTH(TOKEN),
  }).then((resp) => resp.json());
  return response.data;
});

export const TestimonialsData = createAsyncThunk(
  "Home/TestimonialsData",
  async () => {
    const response = await fetch(`${API}/comentario`, {
      headers: HEADERAUTH(TOKEN),
    }).then((resp) => resp.json());
    return response.data;
  }
);
export const ServiceData = createAsyncThunk("Home/ServiceData", async () => {
  const response = await fetch(`${API}/servicios`, {
    headers: HEADERAUTH(TOKEN),
  }).then((resp) => resp.json());
  return response.data;
});

export const setFile = createAsyncThunk(
  "Home/setFile",
  async (data: { file: File; token: string }) => {
    const formData = new FormData();
    formData.append("archivo", data.file);
    const response = await fetch(`${API}/archivo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      body: formData,
    }).then((resp) => resp.json());
    toast.info(response.message);
  }
);

export const deleteFile = createAsyncThunk(
  "Home/deleteFile",
  async (id: string, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/archivo/${id}`, {
      method: "DELETE",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    }).then((resp) => {
      thunkAPI.dispatch(getFiles());
      return resp.json();
    });
    toast.info(response.message);
  }
);

export type IByReportDeceasedPerson = {
  persona_autorizada_id: string;
  monto: string;
  metodo: string;
  estado: "Pendiente";
};

export const setByReportDeceasedPerson = createAsyncThunk(
  "Home/setByReportDeceasedPerson",
  async (data: IByReportDeceasedPerson, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/persona-autorizada-pago`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    return response.message;
  }
);

export type INotificationDeceasedPerson = {
  persona_autorizada_id: string;
  user_id: string;
  nombre: string;
  apellidos: string;
  email: string;
};

export const setNotificationDeceasedPerson = createAsyncThunk(
  "Home/setNotificationDeceasedPerson",
  async (data: INotificationDeceasedPerson) => {
    const response = await fetch(`${API}/notificacion-fallecimiento`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    return response;
  }
);

export const getConfigurations = createAsyncThunk(
  "Home/getConfigurations",
  async () => {
    const response = await fetch(`${API}/configuraciones`).then((resp) =>
      resp.json()
    );
    return response.data;
  }
);

export type payloadService = {
  id: number;
  name: string;
  descrip_corta: string;
  descrip_larga: string;
  logo: string;
  img_principal: string;
  how_work: IFaqs;
  services: string[];
  vidio_url: string[];
  imgs: [];
  preguntas_frecuentes: [];
  precio_mes: string;
  tipo: IService_type;
  formato: {
    url_pdf?: string;
    url_pdf_aceptacion_herencia?: string;
    url_pdf_voluntad_anticipada?: string;
  };
};

export const Home = createSlice({
  name: "Home",
  initialState,
  reducers: {
    resetServicesError: (state) => {
      state.services.error = false;
    },
    setShowReportDeceased: (state, action: { payload: boolean | "toggle" }) => {
      if (action.payload === "toggle") {
        state.show_report_deceased = !state.show_report_deceased;
      } else state.show_report_deceased = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    builder
      .addCase(
        getConfigurations.fulfilled,
        (state, action: { payload: { nombre: string; valor: string }[] }) => {
          const payload = action.payload;
          const value = payload.find(
            (item) => item.nombre === "monto_notificar_fallecimiento"
          );
          if (value) state.amount_pay_report_deceased_person = value.valor;
        }
      )
      .addCase(SlidersData.pending, (state) => {
        state.sliders.isLoading = true;
      }),
      builder.addCase(SlidersData.rejected, (state) => {
        state.sliders.isLoading = false;
        state.sliders.error = true;
      }),
      builder.addCase(SlidersData.fulfilled, (state, action) => {
        state.sliders.isLoading = false;
        state.sliders.error = false;
        action.payload.map(
          (item: {
            id: number;
            img: string;
            titulo: string;
            subtitulo: string;
            descripcion: string;
          }) =>
            state.sliders.info.push({
              id: item.id,
              slide: item.img,
              title: item.titulo,
              subtitle: item.subtitulo,
              description: item.descripcion,
            })
        );
      });
    builder.addCase(TestimonialsData.pending, (state) => {
      state.testimonials.isLoading = true;
    }),
      builder.addCase(TestimonialsData.rejected, (state) => {
        state.testimonials.isLoading = false;
        state.testimonials.error = true;
      }),
      builder.addCase(TestimonialsData.fulfilled, (state, action) => {
        state.testimonials.isLoading = false;
        state.testimonials.error = false;
        action.payload.map(
          (item: {
            id: number;
            nombre: string;
            avatar: string;
            texto: string;
          }) =>
            state.testimonials.info.push({
              id: item.id,
              name: item.nombre,
              avatar: item.avatar,
              description: item.texto,
            })
        );
      });
    builder.addCase(ServiceData.pending, (state) => {
      state.services.isLoading = true;
    }),
      builder.addCase(ServiceData.rejected, (state) => {
        state.services.isLoading = false;
        state.services.error = true;
      }),
      builder.addCase(ServiceData.fulfilled, (state, action) => {
        state.services.isLoading = false;
        state.services.error = false;
        action.payload.map((item: payloadService) =>
          state.services.info.push({
            id: item.id,
            name: item.name,
            shortDescription: item.descrip_corta,
            longDescription: item.descrip_larga,
            logo: item.logo,
            imgPrincipal: item.img_principal,
            gallery: item.imgs,
            how_work: item.how_work,
            services: item.services,
            vidio_url: item.vidio_url,
            faqs: item.preguntas_frecuentes,
            price_month: item.precio_mes,
            type: item.tipo,
            pdf_acceptance: item.formato.url_pdf,
            pdf_advance_directive: item.formato.url_pdf_voluntad_anticipada,
            pdf_inheritance: item.formato.url_pdf_aceptacion_herencia,
          })
        );
      });
  },
});
export const { resetServicesError, setShowReportDeceased } = Home.actions;

export const selectAmountToReportDeceasedPerson = (state: RootState) =>
  state.Home.amount_pay_report_deceased_person;
export const selectShowReportDeceased = (state: RootState) =>
  state.Home.show_report_deceased;
export const selectTestimonialsInfo = (state: RootState) =>
  state.Home.testimonials.info;
export const selectTestimonialsLoading = (state: RootState) =>
  state.Home.testimonials.isLoading;
export const selectTestimonialsError = (state: RootState) =>
  state.Home.testimonials.error;
export const selectSlidersInfo = (state: RootState) => state.Home.sliders.info;
export const selectSlidersLoading = (state: RootState) =>
  state.Home.sliders.isLoading;
export const selectSlidersError = (state: RootState) =>
  state.Home.sliders.error;
export const selectServicesInfo = (state: RootState) =>
  state.Home.services.info;
export const selectServicesLoading = (state: RootState) =>
  state.Home.services.isLoading;
export const selectServicesError = (state: RootState) =>
  state.Home.services.error;
