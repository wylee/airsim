import { ref } from "vue";
import { defineStore } from "pinia";

import socket from "./socket";

type Role =
  | "lead"
  | "wing"
  | "viewer"

export default defineStore("app", () => {
  const name = ref<string | undefined>();
  const role = ref<Role | undefined>();
  const connected = ref(false);

  const setName = (nameVal?: string) => {
    name.value = nameVal;
  };

  const setRole = (roleVal: Role) => {
    role.value = roleVal;
  };

  const setConnected = (connectedVal: boolean) => {
    connected.value = connectedVal;
  };

  const connect = (nameVal: string, roleVal: Role) => {
    socket.connect();
    name.value = nameVal;
    role.value = roleVal;
  };

  const disconnect = () => {
    if (confirm("Disconnect?")) {
      socket.disconnect();
      name.value = undefined;
      role.value = undefined;
    }
  };

  return { name, setName, role, setRole, connected, setConnected, connect, disconnect };
});
