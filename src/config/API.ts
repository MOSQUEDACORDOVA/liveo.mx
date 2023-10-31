export const API = "https://admin.liveo.mx/api" as const;
export const HEADERAUTH = (TOKEN: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
});
