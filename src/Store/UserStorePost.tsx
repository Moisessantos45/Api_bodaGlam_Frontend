import { create } from "zustand";
import {
  ConfigType,
  TypePost,
  TypePostOmitId,
  TypePostOmitIdAndIdUser,
} from "../Types/types";
import UrlApi from "../Config/UrlApi";
import toatifySuccess from "../Utils/Utils";

type Post = {
  addPost: (data: TypePostOmitId) => Promise<TypePost>;
  updatePost: (id: string, data: TypePostOmitIdAndIdUser) => Promise<TypePost>;
  changeStatus: (id: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
};

const useUserStorePost = create<Post>()(() => ({
  addPost: async (data) => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await UrlApi.post("Post", { ...data }, confi);
      const dataRes = response.data ? response.data : {};
      toatifySuccess("Post added successfully", true);
      return dataRes;
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
  updatePost: async (id, data) => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await UrlApi.put(`Post/${id}`, { ...data }, confi);
      const dataRes = response.data ? response.data : {};
      toatifySuccess("Post updated successfully", true);
      return dataRes;
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
  changeStatus: async (id) => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await UrlApi.patch(`Post/${id}`, confi);
      toatifySuccess("Status changed successfully", true);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
  deletePost: async (id) => {
    try {
      const token = localStorage.getItem("tokenUser") || "";
      if (token === "") {
        return;
      }
      const confi: ConfigType = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await UrlApi.delete(`Post/${id}`, confi);
      toatifySuccess("Post deleted successfully", true);
    } catch (error) {
      if (error instanceof Error) {
        toatifySuccess(error.message, false);
      }
    }
  },
}));

export default useUserStorePost;
