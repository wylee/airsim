<script setup lang="ts">
import { ref } from "vue";

import useAppStore from "../store";

const store = useAppStore();
const name = ref(store.currentUser?.name);
const role = ref(store.currentUser?.role);
const errorMessage = ref();

const connect = () => {
  if (typeof name.value === "string" && typeof role.value === "string") {
    store.connect(name.value, role.value);
  } else {
    errorMessage.value = "Name and role are required";
  }
};
</script>

<template>
  <form class="flex-1 p-4 flex flex-col gap-4" @submit.prevent="connect">
    <fieldset>
      <label for="name">Name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
        placeholder="Enter your name"
      />
    </fieldset>

    <fieldset>
      <label for="role">Role</label>
      <select id="role" v-model="role" required>
        <option value="" selected="selected">-- Select a Role --</option>
        <option value="lead">Lead</option>
        <option value="wing">Wing</option>
        <option value="viewer">Viewer</option>
      </select>
    </fieldset>

    <div class="flex justify-center">
      <button type="submit">Connect</button>
    </div>

    <p v-if="errorMessage" class="mt-4 text-red-900">
      {{ errorMessage }}
    </p>
  </form>
</template>
