<script setup lang="ts">
import BaseModal from "../modals/BaseModal.vue";
import LoadingButton from "../loading/LoadingButton.vue";
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close", "clear", "submit"]);

const handleSubmit = (type: string) => {
  emit("submit", type);
};

const clearForm = () => {
  emit("clear");
};
</script>

<template>
  <base-modal size="lg" @close="emit('close')" :footer="false">
    <template #header>
      <div>Create A new User</div>
    </template>
    <form @submit.prevent="handleSubmit('create')">
      <div class="flex flex-col space-y-2">
        <div class="flex flex-col space-y-2">
          <label for="name" class="mb-2 block text-sm font-bold text-gray-700"
            >Name</label
          >
          <input
            id="name"
            class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            placeholder="John Doe"
            v-model="user.name"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="email" class="mb-2 block text-sm font-bold text-gray-700"
            >Email</label
          >
          <input
            id="email"
            class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="email"
            placeholder="Email"
            v-model="user.email"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label
            for="password"
            class="mb-2 block text-sm font-bold text-gray-700"
            >Password</label
          >
          <input
            class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            type="password"
            id="password"
            placeholder="Password"
            v-model="user.password"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <button class="btn" type="submit">
            <loading-button v-if="loading"></loading-button> Create
          </button>
          <button @click="clearForm" class="btn-warning" type="button">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </base-modal>
</template>

<style scoped>
.btn {
  @apply flex justify-center space-x-2 rounded-md bg-green-500 p-2 text-white hover:bg-green-600;
}

.btn-warning {
  @apply rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600;
}

.btn-danger {
  @apply rounded-md bg-red-500 p-2 text-white hover:bg-red-600;
}
</style>
