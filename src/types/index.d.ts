import { IUser } from "@/features/LoginRegisterUser";

type IPROFILEDATA = Omit<
  IUser,
  "id" | "roles" | "estado" | "vivo" | "liberacion"
>;
