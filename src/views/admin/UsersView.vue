<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import LoadingButton from "@/components/loading/LoadingButton.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import UserForm from "@/components/forms/UserForm.vue";
import { fetchAll, create, update, remove } from "@/services/user";

const users = ref([]);
onMounted(async () => {
  const { data } = await fetchAll();
  users.value = data;
});

const loading = ref(false);
const modalOpen = ref(false);
const currentModal = ref("");
const currentUserId = ref(0);

const toggleModal = function (current: string) {
  modalOpen.value = !modalOpen.value;
  currentModal.value = current;
};

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const setUser = (userId, modal: string) => {
  const user = users.value.find((user) => user.id == userId);
  if (user) {
    form.name = user.name;
    form.email = user.email;
    form.password = user.password;

    currentUserId.value = userId;
  } else {
    clearForm();
  }
  toggleModal(modal);
};

const clearForm = () => {
  form.name = "";
  form.email = "";
  form.password = "";

  toggleModal("");
  currentUserId.value = 0;
};

const handleSubmit = async (type: string) => {
  loading.value = true;
  if (type == "create") {
    const res = await create(form);
    if (res) {
      const { data } = await fetchAll();
      users.value = data;
      console.log(res.message);
    } else {
      console.log("Something went wrong");
    }
  } else if (type == "update") {
    const res = await update(currentUserId.value, form);
    if (res) {
      const { data } = await fetchAll();
      users.value = data;
      console.log(res.message);
    } else {
      console.log("Something went wrong");
    }
  } else if (type == "delete") {
    const res = await remove(currentUserId.value);
    if (res) {
      const { data } = await fetchAll();
      users.value = data;
      console.log(res.message);
    } else {
      console.log("Something went wrong");
    }
  } else {
    console.log("Invalid type");
    clearForm();
  }
  loading.value = false;
  clearForm();
};
</script>

<template>
  <div class="flex flex-col space-y-2 md:space-y-4">
    <div class="flex justify-between">
      <h1 class="text-center text-2xl font-bold">Users List</h1>
      <button
        class="rounded-md bg-green-500 p-2 text-white hover:bg-green-600"
        @click="toggleModal('create')"
      >
        Create
      </button>
    </div>
    <!-- users list -->
    <div class="mt-2" v-if="users.length">
      <table class="mx-auto table-auto">
        <thead>
          <tr class="bg-gradient-to-r from-green-500 to-green-800">
            <th class="px-16 py-2">
              <span class="font-semibold text-gray-100">Name</span>
            </th>
            <th class="px-16 py-2">
              <span class="font-semibold text-gray-100">Email</span>
            </th>

            <th class="px-16 py-2">
              <span class="font-semibold text-gray-100">Role</span>
            </th>

            <th class="px-16 py-2">
              <span class="font-semibold text-gray-100">Action</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr
            class="border-b-2 border-gray-200 bg-white"
            v-for="user in users"
            :key="user.id"
          >
            <td>
              <span class="ml-2 text-center font-semibold">{{
                user.name
              }}</span>
            </td>

            <td class="px-16 py-2">
              <span>{{ user.email }}</span>
            </td>
            <td class="px-16 py-2">
              <span>{{ user.role }}</span>
            </td>

            <td class="px-16 py-2">
              <div class="flex justify-between space-x-2">
                <button
                  class="focus:shadow-outline w-full rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 focus:outline-none"
                  type="submit"
                  @click="setUser(user.id, 'update')"
                >
                  Edit
                </button>
                <button
                  class="focus:shadow-outline w-full rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 focus:outline-none"
                  type="submit"
                  @click="setUser(user.id, 'delete')"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="rounded-md border">
      <p class="text-center text-gray-500">No users found</p>
    </div>
    <!-- end users list -->
    <!-- create modal -->

    <user-form
      v-if="modalOpen && currentModal == 'create'"
      :loading="loading"
      :user="form"
      @close="toggleModal('')"
      @submit="handleSubmit('create')"
      @clear="clearForm"
    />
    <!-- end create modal -->
    <!-- update modal -->

    <user-form
      v-else-if="modalOpen && currentModal == 'update'"
      :loading="loading"
      :user="form"
      @close="toggleModal('')"
      @submit="handleSubmit('update')"
      @clear="clearForm"
    />

    <!-- end update modal -->
    <!-- delete modal -->

    <base-modal
      size="sm"
      v-else-if="modalOpen && currentModal === 'delete'"
      @close="toggleModal"
    >
      <template #header>
        <div>Delete Confirmation</div>
      </template>
      Are you sure you want to delete {{ form.name }}?
      <template #footer>
        <button class="btn-danger" @click="handleSubmit('delete')">
          <loading-button v-if="loading"></loading-button>
          Delete
        </button>
        <button class="btn-warning" @click="clearForm">Cancel</button>
      </template>
    </base-modal>

    <!-- end delete modal -->
  </div>
</template>

<style scoped>
.btn {
  @apply rounded-md bg-green-500 p-2 text-white hover:bg-green-600;
}

.btn-warning {
  @apply rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600;
}

.btn-danger {
  @apply rounded-md bg-red-500 p-2 text-white hover:bg-red-600;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
