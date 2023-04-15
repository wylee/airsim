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
  <form class="" @submit.prevent="connect">
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
      <label>Role</label>
      <div class="roles">
        <label id="role-lead">
          <input v-model="role" type="radio" value="lead" />
          <span :class="role === 'lead' ? 'font-bold' : undefined">Lead</span>
        </label>
        <label id="role-wing">
          <input v-model="role" type="radio" value="wing" />
          <span :class="role === 'wing' ? 'font-bold' : undefined">Wing</span>
        </label>
        <label id="role-viewer">
          <input v-model="role" type="radio" value="viewer" />
          <span :class="role === 'viewer' ? 'font-bold' : undefined"
            >Viewer</span
          >
        </label>
      </div>
    </fieldset>

    <div class="flex justify-center">
      <button type="submit">Connect</button>
    </div>

    <p v-if="errorMessage" class="mt-4 text-red-900">
      {{ errorMessage }}
    </p>
  </form>
</template>

<style scoped lang="postcss">
form {
  @apply flex-1 p-4 flex flex-col gap-8;

  & > fieldset > label {
    @apply text-xl font-bold;
  }

  .roles {
    @apply flex flex-row gap-4;

    & > label {
      @apply flex-1 flex flex-col items-center gap-2 cursor-pointer;

      & > input {
        @apply form-radio w-full p-4 border rounded shadow cursor-pointer;
      }

      &#role-lead {
        @apply text-red-900;
        & > input {
          @apply bg-red-700 border-red-900;
        }
      }

      &#role-wing {
        @apply text-green-900;
        & > input {
          @apply bg-green-700 border-green-900;
        }
      }

      &#role-viewer {
        @apply text-blue-900;
        & > input {
          @apply bg-blue-700 border-blue-900;
        }
      }
    }
  }
}
</style>
