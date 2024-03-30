interface TypePost {
  id: string;
  tipo: string;
  imagen: string;
  descripcion: string;
  titulo: string;
  author: string;
  fecha: string;
  idUser: string;
  status: boolean;
}

interface User {
  id: string;
  nameUser: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
  clave: string;
  active: boolean;
}

type UserTypesOmitPassword = Omit<User, "password">;

type ConfigType = {
  headers: {
    "content-Type": string;
    Authorization: string;
  };
  data: {
    token: string;
  };
};

export { TypePost, User, UserTypesOmitPassword, ConfigType };
