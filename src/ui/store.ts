import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

import { IS_DEV } from "./consts";
import socket from "./socket";

type Role = "" | "lead" | "wing" | "viewer";

interface User {
  id: string;
  name: string;
  role: Role;
  connected: boolean;
}

interface BroadcastMessage {
  user: User;
  message: string;
}

const INITIAL_USER: User = {
  id: uuid(),
  name: "",
  role: "",
  connected: false,
};

export default defineStore("app", () => {
  // Users ------------------------------------------------------------

  // Current/session user.
  const currentUser = ref<User>(INITIAL_USER);

  // All connected users. Users are added to this list only after
  // they've successfully connected.
  const connectedUsers = ref<User[]>([]);
  const sortedUsers = computed(() => {
    return connectedUsers.value.sort((a, b) => a.name.localeCompare(b.name));
  });

  // Set current/session user.
  const setCurrentUser = (userVal: User) => {
    currentUser.value = userVal;
  };

  const setCurrentUserConnected = () => {
    currentUser.value = {
      ...currentUser.value,
      connected: true,
    };
  };

  const setConnectedUsers = (users: User[]) => {
    connectedUsers.value = users;
  };

  const addConnectedUser = (user: User) => {
    connectedUsers.value = [...connectedUsers.value, user];
  };

  const removeConnectedUser = (id: string) => {
    connectedUsers.value = connectedUsers.value.filter((u) => u.id !== id);
  };

  // Connect current user to server. Note that we wait for the server to
  // respond before actually show the user as connected.
  const connect = (name: string, role: Role) => {
    const id = uuid();
    currentUser.value = {
      id,
      name,
      role,
      connected: false,
    };
    socket.auth = { id, name, role };
    socket.connect();
  };

  // Disconnect current user from server.
  const disconnect = () => {
    if (IS_DEV || confirm("Disconnect?")) {
      broadcastMessage("<left>");
      setTimeout(() => {
        reset();
        socket.disconnect();
      }, 0);
    }
  };

  // Errors -----------------------------------------------------------

  const error = ref<Error>();

  const setError = (err: Error) => {
    error.value = err;
  };

  const clearError = () => {
    error.value = undefined;
  };

  // Broadcast --------------------------------------------------------

  const broadcastMessages = ref<BroadcastMessage[]>([]);
  const showBroadcastPanel = ref(true);

  const toggleShowBroadcastPanel = () => {
    showBroadcastPanel.value = !showBroadcastPanel.value;
  };

  const broadcastMessage = (message: string) => {
    socket.emit("broadcast:message", { userId: currentUser.value.id, message });
    appendBroadcastMessage({ user: currentUser.value, message });
  };

  const appendBroadcastMessage = (message: BroadcastMessage) => {
    const messages = broadcastMessages.value.slice(0, 19);
    messages.push(message);
    broadcastMessages.value = messages;
  };

  // Utilities --------------------------------------------------------

  const reset = () => {
    currentUser.value = INITIAL_USER;
    connectedUsers.value = [];
    broadcastMessages.value = [];
    error.value = undefined;
  };

  return {
    currentUser,
    setCurrentUser,
    setCurrentUserConnected,

    connect,
    disconnect,

    connectedUsers,
    sortedUsers,
    setConnectedUsers,
    addConnectedUser,
    removeConnectedUser,

    error,
    setError,
    clearError,

    showBroadcastPanel,
    toggleShowBroadcastPanel,
    broadcastMessages,
    broadcastMessage,
    appendBroadcastMessage,
  };
});
