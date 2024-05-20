import { io } from "socket.io-client";

const socket = io();

export const useSocket = () => ({ socket });
