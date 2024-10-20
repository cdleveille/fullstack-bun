import { io } from "socket.io-client";

import { SocketEvent } from "@constants";

export const socket = io();

socket.on(SocketEvent.Reload, () => window.location.reload());
