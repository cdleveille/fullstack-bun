import { io, type Socket } from "socket.io-client";

import { SocketEvent } from "@constants";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";
import { Config } from "@utils";

export const socket: Socket<TServerToClientSocketEvent, TClientToServerSocketEvent> = io(
	`ws://${location.hostname}:${Config.WS_PORT}`,
	{ withCredentials: true }
);

socket.on(SocketEvent.Reload, () => location.reload());
