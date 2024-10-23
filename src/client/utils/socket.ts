import { io, Socket } from "socket.io-client";

import { SocketEvent } from "@constants";
import { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";

export const socket: Socket<TServerToClientSocketEvent, TClientToServerSocketEvent> = io();

socket.on(SocketEvent.Reload, () => window.location.reload());
