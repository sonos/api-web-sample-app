import React from "react";
import socketURL from "../../config.json"
import { io } from "socket.io-client";

export const socket = io.connect(socketURL);
export const SocketContext = React.createContext();