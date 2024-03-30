import { create } from "zustand";
import { TypePost, UserTypesOmitPassword } from "../Types/types";
import UrlApi from "../Config/UrlApi";

type User = {
  dataUser: UserTypesOmitPassword;
  dataPost: TypePost[];
  dataPosEdit: TypePost;
  loading: boolean;
  openModal: boolean;
  openModalDelete: boolean;
  setUser: (data: UserTypesOmitPassword) => void;
  setPost: (data: TypePost[]) => void;
  setPostEdit: (data: TypePost) => void;
  setLoading: (data: boolean) => void;
  setOpenModal: (data: boolean) => void;
  setOpenModalDelete: (data: boolean) => void;
  getDataUserandPost: () => Promise<void>;
};

const useUserStore = create<User>()((set) => ({
  dataUser: {} as UserTypesOmitPassword,
  dataPost: [],
  dataPosEdit: {} as TypePost,
  loading: true,
  openModal: false,
  openModalDelete: false,
  setUser: (data) => set({ dataUser: data }),
  setPost: (data) => set({ dataPost: data }),
  setPostEdit: (data) => set({ dataPosEdit: data }),
  setLoading: (data) => set({ loading: data }),
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
      const response = await Promise.all([UrlApi("user"), UrlApi("post")]);
      const dataRes = response.map((data) => data.data);
      set({ dataUser: dataRes[0] });
      set({ dataPost: dataRes[1] });
    } catch (error) {
      return;
    }
  },
}));

export default useUserStore;
