<script setup lang="ts">
import { onUnmounted } from "vue";
import useAppStore from "./store";
import ConnectionForm from "./components/ConnectionForm.vue";
import UserList from "./components/UserList.vue";
import socket from "./socket";

const store = useAppStore();

onUnmounted(() => {
  console.debug("App unmounted");
  socket.disconnect();
});
</script>

<template>
  <header>
    <h1>AirSim</h1>

    <div class="flex items-center gap-2">
      <template v-if="store.currentUser.connected">
        <div>{{ store.currentUser.name }}</div>
        <div>({{ store.currentUser.role }})</div>
      </template>

      <div
        v-if="store.currentUser.connected"
        title="connected (click to disconnect)"
        class="cursor-pointer"
        @click="store.disconnect"
      >
        🟢
      </div>

      <div v-else title="not connected">🔴</div>
    </div>
  </header>

  <main>
    <UserList />
    <ConnectionForm v-if="!store.currentUser.connected" />
  </main>

  <footer>&copy; 2023 AirSim</footer>
</template>
