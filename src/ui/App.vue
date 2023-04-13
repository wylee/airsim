<script setup lang="ts">
import useAppStore from "./store";
import Home from "./components/Home.vue";

const store = useAppStore();
</script>

<template>
  <header>
    <h1>AirSim</h1>

    <div class="flex items-center gap-2">
      <div v-if="store.name">{{ store.name }}</div>
      <div v-if="store.role">({{ store.role }})</div>
      <div
        v-if="store.connected"
        title="connected (click to disconnect)"
        class="cursor-pointer"
        @click="store.disconnect"
      >🟢
      </div>
      <div
        v-else
        title="not connected"
      >🔴</div>
    </div>
  </header>

  <main>
    <Home />
  </main>

  <footer>
    &copy; 2023 AirSim
  </footer>
</template>
