<script setup lang="ts">
import { onUnmounted } from "vue";
import useAppStore from "./store";
import ConnectionForm from "./components/ConnectionForm.vue";
import UserList from "./components/UserList.vue";
import socket from "./socket";
import BroadcastPanel from "./components/BroadcastPanel.vue";

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

      <div
        v-if="store.currentUser.connected && !store.showBroadcastPanel"
        title="Show broadcast panel"
        class="cursor-pointer"
        @click="store.toggleShowBroadcastPanel"
      >
        ↓
      </div>
    </div>
  </header>

  <div v-if="store.error" class="error-container">
    <div class="error-mask" />
    <div class="error">
      <h2>Error</h2>
      <p>{{ store.error.message }}</p>
      <button type="button" @click="store.clearError">Dismiss</button>
      <button
        type="button"
        class="error-close-button"
        @click="store.clearError"
      >
        &times;
      </button>
    </div>
  </div>

  <main>
    <UserList v-if="store.currentUser.connected" />
    <ConnectionForm v-if="!store.currentUser.connected" />
    <BroadcastPanel v-if="store.currentUser.connected" />
  </main>

  <footer>&copy; 2023 AirSim</footer>
</template>

<style scoped lang="postcss">
.error-container {
  @apply absolute inset-0 z-10;

  .error-mask {
    @apply absolute inset-0 bg-gray-900 opacity-50;
  }

  .error-close-button {
    @apply absolute top-4 right-4;
  }

  .error {
    @apply absolute top-4 inset-x-4;
    @apply p-4 bg-white border-2 border-red-700 rounded-lg shadow-lg;
    & p,
    h2 {
      @apply mb-4;
    }
  }
}
</style>
