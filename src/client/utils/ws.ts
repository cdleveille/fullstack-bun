import { io, type Socket } from "socket.io-client";

import { SocketEvent } from "@constants";
import type { TClientToServerSocketEvent, TServerToClientSocketEvent } from "@types";
import { Config } from "@utils";

const uri = `${location.protocol}//${location.hostname}:${Config.WS_PORT}`;

export const socket: Socket<TServerToClientSocketEvent, TClientToServerSocketEvent> = io(uri);

socket.on(SocketEvent.Reload, () => location.reload());
