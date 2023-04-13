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

const INITIAL_USER: User = {
  id: uuid(),
  name: "",
  role: "",
  connected: false,
};

export default defineStore("app", () => {
  // Current/session user.
  const currentUser = ref<User>(INITIAL_USER);

  // All connected users. Users are added to this list only after
  // they've successfully connected.
  const connectedUsers = ref<User[]>([]);
  const sortedUsers = computed(() => {
    return connectedUsers.value.sort((a, b) => a.name.localeCompare(b.name));
  });

  // Set current/session user.
  const setCurrentUser = (userVal: User): void => {
    currentUser.value = userVal;
  };

  const setCurrentUserConnected = (): void => {
    currentUser.value = {
      ...currentUser.value,
      connected: true,
    };
  };

  const setConnectedUsers = (users: User[]): void => {
    connectedUsers.value = users;
  };

  const addConnectedUser = (user: User): void => {
    connectedUsers.value = [...connectedUsers.value, user];
  };

  const removeConnectedUser = (id: string): void => {
    connectedUsers.value = connectedUsers.value.filter((u) => u.id !== id);
  };

  // Connect current user to server. Note that we wait for the server to
  // respond before actually show the user as connected.
  const connect = (name: string, role: Role): void => {
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
  const disconnect = (): void => {
    if (IS_DEV || confirm("Disconnect?")) {
      currentUser.value = INITIAL_USER;
      socket.disconnect();
    }
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
  };
});
