import { io, Socket } from "socket.io-client";

import { SocketEvent } from "@constants";
import type { TClientToServerEvents, TServerToClientEvents } from "@types";

export const socket: Socket<TServerToClientEvents, TClientToServerEvents> = io();

socket.on(SocketEvent.Reload, () => window.location.reload());
