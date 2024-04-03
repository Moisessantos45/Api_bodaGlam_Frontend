import { create } from "zustand";

interface Navigation {
  lengthPost: number;
  itemsPerPage: number;
  page: number;
  setLength: (data: number) => void;
  setPage: (data: number) => void;
  nextPageNavigation: () => void;
  prevPageNavigation: () => void;
}

const PostNavigation = create<Navigation>()((set, get) => ({
  lengthPost: 0,
  itemsPerPage: 6,
  page: 1,
  setLength: (data) => set({ lengthPost: data }),
  setPage: (data) => set({ page: data }),
  nextPageNavigation: () => {
    const { page } = get();
    set({ page: page + 1 });
  },
  prevPageNavigation: () => {
    const { page } = get();
    set({ page: page - 1 });
  },
}));

export default PostNavigation;
