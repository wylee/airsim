import { io } from "socket.io-client";

import { IS_DEV, WEBSOCKET_URL } from "./consts";
import useAppStore from "./store";

const socket = io(WEBSOCKET_URL, { autoConnect: false });

interface Err {
  type: string;
}

// When the current user successfully connects to the server:
//
// 1. Update the current user's connection state.
// 2. Emit add-user message for broadcast to other clients.
socket.on("connect", () => {
  const store = useAppStore();
  store.setCurrentUserConnected();
  socket.emit("user:add", store.currentUser);
});

socket.on("connect_error", (err) => {
  const store = useAppStore();
  store.setError(err);
});

socket.on("disconnect", () => {
  const store = useAppStore();
  store.disconnect();
});

socket.on("user:added", (user) => {
  const store = useAppStore();
  store.addConnectedUser(user);
});

socket.on("user:removed", (id) => {
  const store = useAppStore();
  store.removeConnectedUser(id);
});

socket.on("user:list", (users) => {
  const store = useAppStore();
  store.setConnectedUsers(users);
});

if (IS_DEV) {
  socket.onAny((event, ...args) => {
    console.log("websocket event:", event, ...args);
  });
}

export default socket;
