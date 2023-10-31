import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API, HEADERAUTH } from "@/config";
import { IDataSaved } from "@/pages/dashboard/components/user_dashboard/NewWill";
import { toast } from "react-toastify";

export type IListPosthumousWill = {
  id: string;
  texto?: string;
  destinatario: string;
  archivo?: string;
  created_at: string;
};

export interface IEditDataSaved
  extends Omit<IListPosthumousWill, "created_at" | "archivo"> {
  archivo?: File;
  token: string;
}

type IStates = { loading: boolean; error: boolean };

type IProps = {
  posthumous_will: IListPosthumousWill | null;
  list_posthumous_wills: IListPosthumousWill[];
  posthumous_will_state: IStates;
};

interface INewWill extends IDataSaved {
  token: string;
}

const initialState: IProps = {
  list_posthumous_wills: [],
  posthumous_will: null,
  posthumous_will_state: { loading: false, error: false },
};

export const setNewPosthumousWill = createAsyncThunk(
  "PosthumousWills/SetNewPosthumousWill",
  async (data: INewWill) => {
    const formData = new FormData();
    data.archivo && formData.append("archivo", data.archivo);
    data.texto && formData.append("texto", data.texto);
    formData.append("destinatario", data.destinatario);
    await fetch(`${API}/voluntad`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((res) => toast.success(res.message));
      } else resp.json().then((res) => toast.success(res.message));
    });
  }
);

export const getPosthumousWills = createAsyncThunk(
  "PosthumousWills/getPosthumousWills",
  async (token: string) => {
    const response = await fetch(`${API}/voluntad`, {
      headers: HEADERAUTH(token),
    }).then((res) => res.json());
    return response.data;
  }
);

export const getPosthumousWillById = createAsyncThunk(
  "PosthumousWills/getPosthumousWillById",
  async ({ id, token }: { id: string; token: string }) => {
    const response = await fetch(`${API}/voluntad/${id}`, {
      headers: HEADERAUTH(token),
    }).then((res) => res.json());
    return response.data;
  }
);

export const editPosthumousWill = createAsyncThunk(
  "PosthumousWills/editPosthumousWill",
  async (data: IEditDataSaved) => {
    const formData = new FormData();
    data.archivo && formData.append("archivo", data.archivo);
    data.texto && formData.append("texto", data.texto);
    formData.append("destinatario", data.destinatario);
    await fetch(`${API}/voluntad/${data.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((res) => toast.success(res.message));
      } else resp.json().then((res) => toast.success(res.message));
    });
  }
);

export const deletePosthumousWill = createAsyncThunk(
  "PosthumousWills/deletePosthumousWill",
  async (data: { id: string; token: string }, thunkApi) => {
    await fetch(`${API}/voluntad/${data.id}`, {
      method: "DELETE",
      headers: HEADERAUTH(data.token),
    }).then((resp) => {
      if (resp.ok) {
        resp
          .json()
          .then((res) => toast.success(res.message))
          .then(() => thunkApi.dispatch(getPosthumousWills(data.token)));
      } else resp.json().then((res) => toast.success(res.message));
    });
  }
);

export const PosthumousWills = createSlice({
  name: "PosthumousWills",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPosthumousWills.pending, (state) => {
        state.posthumous_will_state.loading = true;
      })
      .addCase(getPosthumousWills.fulfilled, (state, action) => {
        state.posthumous_will_state.loading = false;
        state.list_posthumous_wills = action.payload;
      })
      .addCase(deletePosthumousWill.pending, (state) => {
        state.posthumous_will_state.loading = true;
      })
      .addCase(getPosthumousWillById.rejected, (state) => {
        state.posthumous_will_state.loading = false;
        state.posthumous_will_state.error = true;
        toast.error("Error al cargar los datos");
      })
      .addCase(getPosthumousWillById.pending, (state) => {
        state.posthumous_will_state.loading = true;
      })
      .addCase(getPosthumousWillById.fulfilled, (state, action) => {
        state.posthumous_will = action.payload;
        state.posthumous_will_state.loading = false;
        state.posthumous_will_state.error = false;
      });
  },
});

export const selectListPosthumousWills = (state: RootState) =>
  state.PosthumousWills.list_posthumous_wills;
export const selectPosthumousWillById = (state: RootState) =>
  state.PosthumousWills.posthumous_will;
export const selectPosthumousWillStates = (state: RootState) =>
  state.PosthumousWills.posthumous_will_state;
