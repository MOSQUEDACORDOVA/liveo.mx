import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API, HEADERAUTH } from "@/config";
import {
  TOKEN,
  setItemLocalStorage,
  storage_names,
  user,
} from "@/config/LocalStorage";
import { IPROFILEDATA } from "@/types";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { ITABSID } from "@/utils";

type IUserRoles = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: { model_id: number; role_id: number; model_type: string };
};

export interface IUser {
  id?: number;
  name?: string | null;
  apellido?: string | null;
  email?: string | null;
  password?: string | null;
  avatar?: string;
  estado?: string | null;
  telefono?: string | null;
  celular?: string | null;
  dir_calle?: string | null;
  dir_ciudad?: string | null;
  dir_colonia?: string | null;
  dir_pais?: string | null;
  dir_postal?: string | null;
  nacimiento?: string | null | Dayjs;
  roles?: IUserRoles[];
  sector?: string;
  tipo_sector?: string;
  tags?: string[];
  vivo: number;
  liberacion: number;
  url_facebook?: string;
  url_instagram?: string;
  url_tiktok?: string;
  iframe_google?: string;
  descripcion?: string;
  web_site?: string;
}

type ILogin = {
  msg: string;
  token: string;
  user: IUser;
};

type IAuthPersonInfo = {
  nombre: string;
  apellidos: string;
  celular: string;
  email: string;
  id: string;
};

export type IFIles = { id: string; url: string };

type IProps = {
  Logged: boolean;
  Login: { isLoading: boolean; error: boolean; info: ILogin | null };
  Register: { isLoading: boolean; error: boolean; info: any | null };
  DashboardProfile: { info: IUser | null; isLoading: boolean; error: boolean };
  AuthPerson: { info: IAuthPersonInfo[] | null; loading: boolean };
  Files: IFIles[];
  Profile_Active_Tab: ITABSID | null;
};

const initialState: IProps = {
  Logged: user === "Activo",
  Login: { isLoading: false, error: false, info: null },
  Register: { isLoading: false, error: false, info: null },
  DashboardProfile: { isLoading: false, error: false, info: null },
  AuthPerson: { info: null, loading: false },
  Files: [],
  Profile_Active_Tab: null,
};

type SubmitRegister = {
  name: string;
  surname: string;
  email: string;
  password: string;
  mobile: string;
  age: string | null | Dayjs;
};

type SubmitLogin = Pick<SubmitRegister, "email" | "password">;

export const LoginData = createAsyncThunk(
  "LoginRegisterUser/LoginData",
  async (data: SubmitLogin, thunkAPI) => {
    const response = await fetch(`${API}/ingresar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
    if (response.user) {
      // TODO: Remove this comment when the backend is ready
      // if (response.user.estado === "Activo") {
      setItemLocalStorage(storage_names.token, response.token);
      setItemLocalStorage(storage_names.user, response.user.estado);
      thunkAPI.dispatch(LoginRegisterUser.actions.setLogged(true));
      thunkAPI.dispatch(getUserProfile(response.token));
      // }
    }
    return response;
  }
);

// PROFILE DASHBOARD
export const EditProfile = createAsyncThunk(
  "LoginRegisterUser/EditProfile",
  async (data: IPROFILEDATA, thunkAPI) => {
    const { avatar, ...dataCopy } = data;
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/editarperfil`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(dataCopy),
    }).then(async () => {
      if (avatar && typeof avatar !== "string") {
        await thunkAPI
          .dispatch(setAvatar(avatar))
          .unwrap()
          .then(() =>
            thunkAPI
              .dispatch(
                getUserProfile(LoginRegister.Login.info?.token ?? TOKEN)
              )
              .unwrap()
              .then((resp) => resp)
          );
      } else {
        await thunkAPI
          .dispatch(getUserProfile(LoginRegister.Login.info?.token ?? TOKEN))
          .unwrap()
          .then((resp) => resp);
      }
    });
    return response;
  }
);

export const EditCompanyProfile = createAsyncThunk(
  "LoginRegisterUser/EditProfile",
  async (data: IUser, thunkAPI) => {
    const { avatar, id, ...dataCopy } = data;
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const { tags } = dataCopy;
    const newData = {
      ...dataCopy,
      tags: JSON.stringify(tags),
    };
    delete newData["password"];
    const response = await fetch(`${API}/empresas/${id}`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(newData),
    }).then(async () => {
      if (avatar && typeof avatar !== "string") {
        await thunkAPI
          .dispatch(setAvatar(avatar))
          .unwrap()
          .then(() =>
            thunkAPI
              .dispatch(
                getUserProfile(LoginRegister.Login.info?.token ?? TOKEN)
              )
              .unwrap()
              .then((resp) => resp)
          );
      } else {
        await thunkAPI
          .dispatch(getUserProfile(LoginRegister.Login.info?.token ?? TOKEN))
          .unwrap()
          .then((resp) => resp);
      }
    });
    return response;
  }
);

export const setAvatar = createAsyncThunk(
  "LoginRegisterUser/setAvatar",
  async (data: File, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const formData = new FormData();
    formData.append("avatar", data);
    await fetch(`${API}/subir-avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LoginRegister.Login.info?.token ?? TOKEN}`,
      },
      body: formData,
    }).then((resp) => resp.json());
  }
);

export type IAuthPerson = {
  nombre: string;
  apellidos: string;
  celular: string;
  email: string;
  token: string;
};

export const setAuthPerson = createAsyncThunk(
  "LoginRegisterUser/setAuthPerson",
  async (data: IAuthPerson) => {
    const { token, ...data_without_token } = data;
    const response = await fetch(`${API}/persona_autorizada`, {
      method: "POST",
      headers: HEADERAUTH(token),
      body: JSON.stringify(data_without_token),
    }).then((resp) => resp.json());
    return response.message;
  }
);

export type IVerifyAuthPerson = Omit<IAuthPerson, "celular" | "token">;

export const verifyAuthPerson = createAsyncThunk(
  "LoginRegisterUser/verifyAuthPerson",
  async (data: IVerifyAuthPerson, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/persona-autorizada/verificar`, {
      method: "POST",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
      body: JSON.stringify(data),
    }).then((resp) => resp.json());

    if (response.message) {
      toast.error(response.message);
    } else {
      toast.success("Usted está autorizado, prosiga con el formulario");
      return response;
    }
  }
);

export type INotifyDeceased = {
  nacimiento: string | null;
  name: string;
  apellido: string;
  id: string;
};

export const reportDeceased = createAsyncThunk(
  "LoginRegisterUser/reportDeceased",
  async (data: INotifyDeceased, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const dataCopy = {
      nacimiento: data.nacimiento,
      nombre: data.name,
      apellidos: data.apellido,
    };
    const response = await fetch(
      `${API}/persona-autorizada/notificar-difunto/${data.id}`,
      {
        method: "POST",
        headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
        body: JSON.stringify(dataCopy),
      }
    )
      .then((resp) => resp.json())
      .catch((err) => toast.error(err));
    response.message && toast.success(response.message);
  }
);

export const verifyDeceased = createAsyncThunk(
  "LoginRegisterUser/verifyDeceased",
  async (data: INotifyDeceased, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const dataCopy = {
      nacimiento: data.nacimiento,
      nombre: data.name,
      apellidos: data.apellido,
    };
    const response = await fetch(
      `${API}/persona-autorizada/verificar-difunto/${data.id}`,
      {
        method: "POST",
        headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
        body: JSON.stringify(dataCopy),
      }
    )
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((res) => toast.success(res.message));
          return true;
        } else {
          resp.json().then((res) => toast.error(res.message));
          return false;
        }
      })
      .catch((err) => {
        toast.error(err);
        return false;
      });

    return response;
  }
);

export const getAuthPerson = createAsyncThunk(
  "LoginRegisterUser/getAuthPerson",
  async (token: string) => {
    const response = await fetch(`${API}/persona_autorizada`, {
      headers: HEADERAUTH(token),
    }).then((res) => res.json());

    return response.data;
  }
);
export const deleteAuthPerson = createAsyncThunk(
  "deleteAuthPerson/getAuthPerson",
  async (id: string, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    await fetch(`${API}/persona_autorizada/${id}`, {
      method: "DELETE",
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    })
      .then((res) => res.json())
      .then((resp) => {
        thunkAPI.dispatch(getAuthPerson(TOKEN));
        toast.success(resp.message);
      })
      .catch((err) => toast.error(err));
  }
);

export const getUserProfile = createAsyncThunk(
  "LoginRegisterUser/getUserProfile",
  async (token: string, thunkAPI) => {
    const response = await fetch(`${API}/perfil`, {
      headers: HEADERAUTH(token),
    })
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        const tags = data.tags ? JSON.parse(data.tags) : [];
        return { ...data, tags };
      });
    thunkAPI.dispatch(LoginRegisterUser.actions.setLogged(true));
    return response;
  }
);

export const RegisterData = createAsyncThunk(
  "LoginRegisterUser/RegisterData",
  async (data: SubmitRegister) => {
    const temData = {
      name: data.name,
      apellido: data.surname,
      email: data.email,
      password: data.password,
      celular: data.mobile,
      nacimiento: dayjs(data.age).format("YYYY-MM-DD"),
    };
    const response = await fetch(`${API}/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temData),
    }).then((resp) => resp.json());
    return response;
  }
);

export const getFiles = createAsyncThunk(
  "LoginRegisterUser/getFiles",
  async (_, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    const response = await fetch(`${API}/archivo`, {
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    }).then((resp) => resp.json());

    return response.data;
  }
);

// END

export const getActivateAccount = createAsyncThunk(
  "LoginRegisterUser/getActivateAccount",
  async (_, thunkAPI) => {
    const { LoginRegister } = thunkAPI.getState() as RootState;
    await fetch(`${API}/cambiar-a-vivo`, {
      headers: HEADERAUTH(LoginRegister.Login.info?.token ?? TOKEN),
    })
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((res) => toast.success(res.message));
          return true;
        } else {
          resp.json().then((res) => toast.error(res.message));
          return false;
        }
      })
      .catch((err) => {
        toast.error(err);
        return false;
      });
  }
);

export const LoginRegisterUser = createSlice({
  name: "LoginRegisterUser",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.Register.error = action.payload;
    },
    setLogged: (state, action) => {
      state.Logged = action.payload;
    },
    removeRegistermsg: (state) => {
      state.Register.info = null;
    },
    setProfileActiveTab: (state, action: { payload: ITABSID }) => {
      state.Profile_Active_Tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.fulfilled, (state, action) => {
        state.Files = action.payload;
      })
      .addCase(setAuthPerson.pending, (state) => {
        state.AuthPerson.loading = true;
      })
      .addCase(setAuthPerson.rejected, (state) => {
        state.AuthPerson.loading = false;
        toast.error(
          "Ocurrió algún error y no se pudo crear la persona autorizada"
        );
      })
      .addCase(setAuthPerson.fulfilled, (state, action) => {
        state.AuthPerson.loading = false;
        toast.success(action.payload);
      })
      .addCase(getAuthPerson.pending, (state) => {
        state.AuthPerson.loading = true;
      })
      .addCase(getAuthPerson.rejected, (state) => {
        state.AuthPerson.loading = false;
        toast.error(
          "Ocurrió algún error y no se pudo cargar sus personas autorizadas"
        );
      })
      .addCase(getAuthPerson.fulfilled, (state, action) => {
        state.AuthPerson.loading = false;
        state.AuthPerson.info = action.payload;
      })
      .addCase(LoginData.pending, (state) => {
        state.Login.isLoading = true;
      })
      .addCase(LoginData.rejected, (state) => {
        state.Login.isLoading = false;
        state.Login.error = true;
      })
      .addCase(LoginData.fulfilled, (state, action) => {
        state.Login.isLoading = false;
        state.Login.error = false;
        state.Login.info = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.DashboardProfile.isLoading = true;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.DashboardProfile.isLoading = false;
        state.DashboardProfile.error = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.DashboardProfile.isLoading = false;
        state.DashboardProfile.error = false;
        state.DashboardProfile.info = action.payload;
        if (state.DashboardProfile.isLoading)
          state.DashboardProfile.isLoading = false;
      })
      .addCase(RegisterData.pending, (state) => {
        state.Register.isLoading = true;
      })
      .addCase(RegisterData.rejected, (state) => {
        state.Register.isLoading = false;
        state.Register.error = true;
      })
      .addCase(RegisterData.fulfilled, (state, action) => {
        state.Register.isLoading = false;
        state.Register.error = false;
        state.Register.info = action.payload;
      })
      .addCase(EditProfile.pending, (state) => {
        state.DashboardProfile.isLoading = true;
      })
      .addCase(EditProfile.rejected, (state) => {
        state.DashboardProfile.isLoading = false;
        state.DashboardProfile.error = true;
        toast.error(
          "Ocurrió algun error y no se pudieron actualizar los datos"
        );
      })
      .addCase(EditProfile.fulfilled, (state) => {
        state.DashboardProfile.error = false;
        state.DashboardProfile.isLoading = false;
        toast.success("Tus datos han sido actualizados con éxito");
      });
  },
});

export const { setError, setLogged, removeRegistermsg, setProfileActiveTab } =
  LoginRegisterUser.actions;

export const selectDashboardProfileActiveTab = (state: RootState) =>
  state.LoginRegister.Profile_Active_Tab;
export const selectDashboardProfileFiles = (state: RootState) =>
  state.LoginRegister.Files;
export const selectDashboardProfile = (state: RootState) =>
  state.LoginRegister.DashboardProfile.info;
export const selectDashboardProfileLoading = (state: RootState) =>
  state.LoginRegister.DashboardProfile.isLoading;
export const selectDashboardProfileError = (state: RootState) =>
  state.LoginRegister.DashboardProfile.error;
export const selectLoginInfo = (state: RootState) =>
  state.LoginRegister.Login.info;
export const selectLoginLoading = (state: RootState) =>
  state.LoginRegister.Login.isLoading;
export const selectLoginError = (state: RootState) =>
  state.LoginRegister.Login.error;
export const selectRegisterInfo = (state: RootState) =>
  state.LoginRegister.Register.info;
export const selectRegisterLoading = (state: RootState) =>
  state.LoginRegister.Register.isLoading;
export const selectRegisterError = (state: RootState) =>
  state.LoginRegister.Register.error;
export const selectIsLogged = (state: RootState) => state.LoginRegister.Logged;
export const selectAutPersonIsLoading = (state: RootState) =>
  state.LoginRegister.AuthPerson.loading;
export const selectAutPersonInfo = (state: RootState) =>
  state.LoginRegister.AuthPerson.info;
