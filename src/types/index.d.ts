import { IUser } from "@/features/LoginRegisterUser";

type IPROFILEDATA = Omit<
  IUser,
  "roles" | "estado" | "vivo" | "liberacion" | "tags"
>;
