import { create } from "zustand";
import {
  ConfigType,
  TypePost,
  TypeUserData,
  UserTypesOmitPassword,
} from "../Types/types";
import UrlApi from "../Config/UrlApi";
import { redirect } from "react-router-dom";
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
      set({ filterDataSearch: dataResPost });
      set({ loading: false });
    } catch (error) {
      const { logoutUser } = get();
      await logoutUser();
      return;
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
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
  deleteAccount: async (id) => {
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
      await UrlApi.delete(`Users/deleteUser/${id}`, confi);
      set({ dataUser: {} as UserTypesOmitPassword });
      set({ dataPost: [] });
      localStorage.removeItem("tokenUser");
      redirect("/");
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
      await UrlApi.post(`logout?email=${email}`, confi);
      localStorage.removeItem("tokenUser");
      redirect("/");
    } catch (error) {
      return;
    }
  },
}));

export default useUserStore;
