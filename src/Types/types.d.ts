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

type TypePostOmitId = Omit<TypePost, "id" | "fecha">;
type TypePostOmitIdAndIdUser = Omit<TypePost, "id" | "idUser" | "fecha">;

interface User {
  id: string;
  nameUser: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
  active: boolean;
}

type TypeUserData = Omit<User, "id" | "token" | "active">;

type UserTypesOmitPassword = Omit<User, "password">;

type ConfigType = {
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
};

export {
  TypePost,
  TypePostOmitId,
  TypeUserData,
  TypePostOmitIdAndIdUser,
  User,
  UserTypesOmitPassword,
  ConfigType,
};
