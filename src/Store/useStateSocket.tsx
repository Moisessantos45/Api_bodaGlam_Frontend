import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { TypePost } from "../Types/types";

type typeSocket = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  connect: () => void;
  emitir: (evento: string, data: TypePost[]) => void;
};

const UseStateSocket = create<typeSocket>()((set, get) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  connect: () => {
    const socket = io(import.meta.env.VITE_HOST_API);
    set({ socket });
  },
  emitir: (evento, data) => {
    const { socket } = get();
    if (socket) {
      socket.emit(evento, data);
    }
  },
}));

export default UseStateSocket;
