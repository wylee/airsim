<script setup lang="ts">
import { ref } from "vue";

import useAppStore from "../store";

const store = useAppStore();

const message = ref<string>("");

const sendMessage = () => {
  if (message.value.trim()) {
    store.broadcastMessage(message.value.trim());
  }
  message.value = "";
};
</script>

<template>
  <div v-if="store.showBroadcastPanel" class="panel right">
    <h2 class="flex items-center justify-between">
      <span>Broadcast</span>
      <span
        title="Close panel"
        class="cursor-pointer"
        @click="store.toggleShowBroadcastPanel"
        >→</span
      >
    </h2>

    <ul v-if="store.broadcastMessages.length" class="flex-1">
      <li v-for="(m, i) in store.broadcastMessages" :key="i">
        <span class="font-bold">{{ m.user.name }}</span
        >:
        <span>{{ m.message }}</span>
      </li>
    </ul>

    <div v-else class="text-red-500 flex-1">No messages</div>

    <form
      v-if="store.currentUser.connected"
      class="flex flex-col gap-2"
      @submit.prevent="sendMessage"
    >
      <input
        v-model="message"
        type="text"
        placeholder="Message"
        :disabled="!store.currentUser.connected"
      />
    </form>
  </div>
</template>
