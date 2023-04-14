<script setup lang="ts">
import useAppStore from "../store";

const store = useAppStore();

const roleIcon = (role: string) => {
  switch (role) {
    case "lead":
      return "✈️";
    case "wing":
      return "🛩️";
    case "viewer":
      return "👀";
    default:
      return "❓";
  }
};
</script>

<template>
  <div class="w-48 p-4 bg-gray-900 text-gray-100">
    <h2 class="mb-4">Users</h2>

    <ul v-if="store.connectedUsers.length">
      <li v-for="user in store.sortedUsers" :key="user.id" class="flex gap-2">
        <span>{{ roleIcon(user.role) }}</span>
        <span class="flex-1">{{ user.name }}</span>
      </li>
    </ul>

    <div v-else class="text-red-500">No users connected</div>
  </div>
</template>
