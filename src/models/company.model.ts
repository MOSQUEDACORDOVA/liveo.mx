import { Serializable } from "ts-serializable";

export class Company extends Serializable {
  id = 0;
  name = "";
  apellido = "";
  email = "";
  password = "";
  avatar = "";
  logo = "";
  estado = "";
  // telefono: string;
  // celular: string;
  // slogan: string;
  // descripcion: string;
  // web_site: string;
  // dir_calle: string;
  // dir_colonia: string;
  // dir_ciudad: string;
  // dir_postal: any;
  // dir_pais: string;
  // url_facebook: string;
  // url_instagram: string;
  // url_tiktok: string;
  // imagen_principal_empresa: string;
  // categoria_empresa: string;
  // nacimiento: any;
  // deleted_at: any;
  // created_at: string;
  // updated_at: string;
  // tipo_sector: string;
  // sector: any;
  // nombre_usuario: any;
  // liberacion_parcial: any;
  // liberecion_completa: any;

  constructor() {
    super();
  }
}
