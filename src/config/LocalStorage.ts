export const storage_names = {
  user: "user",
  service: "service_id",
  token: "token",
} as const;

const userItem = localStorage.getItem(storage_names.user);
export const user: "Activo" | "Inactivo" = userItem
  ? JSON.parse(userItem)
  : false;

const tokenItem = localStorage.getItem(storage_names.token);
export const TOKEN: string = tokenItem ? JSON.parse(tokenItem) : false;
export const getToken = () => localStorage.getItem(storage_names.token);

const serviceItem = localStorage.getItem(storage_names.service);
export const service: string = serviceItem ? JSON.parse(serviceItem) : false;

export const removeUserLocalStorage = () =>
  localStorage.removeItem(storage_names.user);
export const removeServiceIDLocalStorage = () =>
  localStorage.removeItem(storage_names.service);
export const removeTokenLocalStorage = () =>
  localStorage.removeItem(storage_names.token);

export const setItemLocalStorage = (
  name: string,
  value: string | object | number
) => localStorage.setItem(name, JSON.stringify(value));
