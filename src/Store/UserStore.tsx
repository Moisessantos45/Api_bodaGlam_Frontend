import { create } from "zustand";
import {
  ConfigType,
  TypePost,
  TypeUserData,
  UserTypesOmitPassword,
} from "../Types/types";
import UrlApi from "../Config/UrlApi";
import toatifySuccess from "../Utils/Utils";

type User = {
  dataUser: UserTypesOmitPassword;
  dataPost: TypePost[];
  dataPosEdit: TypePost;
  filterDataSearch: TypePost[];
  loading: boolean;
  confirmDelete: boolean;
  openModal: boolean;
  openModalDelete: boolean;
  setUser: (data: UserTypesOmitPassword) => void;
  setPost: (data: TypePost[]) => void;
  setPostEdit: (data: TypePost) => void;
  setFilterDataSearch: (data: TypePost[]) => void;
  setLoading: (data: boolean) => void;
  setConfirmDelete: (data: boolean) => void;
  setOpenModal: (data: boolean) => void;
  setOpenModalDelete: (data: boolean) => void;
  getDataUserandPost: () => Promise<void>;
  updateUser: (id: string, data: TypeUserData) => Promise<void>;
  verifyEmail: (email: string) => Promise<string>;
  retrievePassword: (token: string, password: string) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  logoutUser: () => Promise<void>;
};

const useUserStore = create<User>()((set, get) => ({
  dataUser: {} as UserTypesOmitPassword,
  dataPost: [],
  dataPosEdit: {} as TypePost,
  filterDataSearch: [],
  loading: true,
  confirmDelete: false,
  openModal: false,
  openModalDelete: false,
  setUser: (data) => set({ dataUser: data }),
  setPost: (data) => set({ dataPost: data }),
  setPostEdit: (data) => set({ dataPosEdit: data }),
  setFilterDataSearch: (data) => set({ filterDataSearch: data }),
  setLoading: (data) => set({ loading: data }),
  setConfirmDelete: (data) => set({ confirmDelete: data }),
  setOpenModal: (data) => set({ openModal: data }),
  setOpenModalDelete: (data) => set({ openModalDelete: data }),
  getDataUserandPost: async (): Promise<void> => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        set({ dataUser: {} as UserTypesOmitPassword });
        set({ loading: false });
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await UrlApi("Users/user", confi);
      const dataResUser = response.data ? response.data.getUserByIdData : {};
      const dataResPost = response.data ? response.data.filterPostByIdUser : [];

      set({ dataUser: dataResUser });
      set({ dataPost: dataResPost });
      // set({ filterDataSearch: dataResPost });
      set({ loading: false });
    } catch (error) {
      const { logoutUser } = get();
      await logoutUser();
    }
  },
  updateUser: async (id, data) => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        set({ dataUser: {} as UserTypesOmitPassword });
        set({ loading: false });
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await UrlApi.put(`Users/updateUser/${id}`, data, confi);
      const dataRes = response.data ? response.data : {};
      set({ dataUser: dataRes });
      toatifySuccess("Update user", true);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
  verifyEmail: async (email): Promise<string> => {
    try {
      const response = await UrlApi.post("Users/retrieve-password", { email });
      const data = response.data ? response.data : "";
      toatifySuccess("valid email", true);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
    return "";
  },
  retrievePassword: async (token, password): Promise<void> => {
    try {
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await UrlApi.post(
        "Users/change-password",
        { password },
        confi
      );
      const msg = response.data ? response.data.msg : "";
      toatifySuccess(msg, true);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
  deleteAccount: async (id): Promise<void> => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        set({ dataUser: {} as UserTypesOmitPassword });
        set({ loading: false });
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await UrlApi.delete(`Users/deleteUser/${id}`, confi);
      set({ dataUser: {} as UserTypesOmitPassword });
      set({ dataPost: [] });
      localStorage.removeItem("tokenUser");
      const msg = response.data ? response.data.msg : "";
      toatifySuccess(msg, true);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
  logoutUser: async (): Promise<void> => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        set({ dataUser: {} as UserTypesOmitPassword });
        set({ loading: false });
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { email } = get().dataUser;
      await UrlApi.post(`Users/logout?email=${email}`, {}, confi);
      localStorage.removeItem("tokenUser");
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
}));

export default useUserStore;
