import { configureStore } from "@reduxjs/toolkit";
import {
  Empresas,
  Home,
  LoginRegisterUser,
  NavBar,
  PosthumousWills,
  Service,
} from ".";

const store = configureStore({
  reducer: {
    NavBar: NavBar.reducer,
    Home: Home.reducer,
    LoginRegister: LoginRegisterUser.reducer,
    Service: Service.reducer,
    Empresas: Empresas.reducer,
    PosthumousWills: PosthumousWills.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
