<script setup lang="ts">
import { ref } from "vue";
import useAppStore from "../store";

const store = useAppStore();
const name = ref(store.name);
const role = ref(store.role);

const connect = () => {
  if (name.value && role.value) {
    store.connect(name.value, role.value);
  }
};

</script>

<template>
  <form v-if="!store.connected" @submit.prevent="connect" class="flex flex-col gap-4">
    <fieldset>
      <label for="name">Name</label>
      <input id="name" type="text" required placeholder="Enter your name" v-model="name" />
    </fieldset>

    <fieldset>
      <label for="role">Role</label>
      <select id="role" required v-model="role">
        <option value="undefined" selected="selected">-- Select a Role --</option>
        <option value="lead">Lead</option>
        <option value="wing">Wing</option>
        <option value="viewer">Viewer</option>
      </select>
    </fieldset>

    <div class="flex justify-end">
      <button type="submit">Connect</button>
    </div>
  </form>
</template>
