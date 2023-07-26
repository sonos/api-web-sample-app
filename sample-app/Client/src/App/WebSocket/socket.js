import React from "react";
import config from "../../config.json"
import { io } from "socket.io-client";

/**
 * Defines WebSocket reference for use in MuseEventHandler
 * Connects to WebSocket initiated in Server
 */
export const socket = io.connect(config.socketURL);
export const SocketContext = React.createContext();
