import React from "react";
import config from "../../config.json"
import { io } from "socket.io-client";

export const socket = io.connect(config.socketURL);
export const SocketContext = React.createContext();
