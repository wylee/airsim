import { io } from "socket.io-client";

import { WEBSOCKET_URL } from "./consts";
import useAppStore from "./store";

const socket = io(WEBSOCKET_URL, { autoConnect: false });

socket.on("connect", () => {
  const store = useAppStore();
  store.setConnected(true);
});

socket.on("disconnect", () => {
  const store = useAppStore();
  store.setConnected(false);
});

export default socket;
