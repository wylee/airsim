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
  <div class="panel">
    <h2>Users</h2>

    <template v-if="store.currentUser.connected">
      <ul v-if="store.connectedUsers.length">
        <li v-for="user in store.sortedUsers" :key="user.id" class="flex gap-2">
          <span>{{ roleIcon(user.role) }}</span>
          <span class="flex-1">{{ user.name }}</span>
        </li>
      </ul>

      <div v-else class="text-red-500">No users connected</div>
    </template>
  </div>
</template>
