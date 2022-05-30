<script setup lang="ts">
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import LoadingButton from "@/components/loading/LoadingButton.vue";
const authStore = useAuthStore();
const router = useRouter();
const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(20) },
    password_confirmation: { required, sameAsPassword: sameAs(form.password) },
  };
});
const v$ = useVuelidate(rules, form, {
  $lazy: true,
  $autoDirty: true,
});
const handleSubmit = async function () {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    const isRegistered = await authStore.register(form);
    if (isRegistered) {
      router.push({ name: "home" });
      v$.value.$reset();
    } else {
      alert("Something went wrong");
    }
  } else {
    v$.value.$errors.forEach((err) => {
      console.log(err.$property, err.$message);
    });
  }
};
</script>

<template>
  <div class="flex flex-col space-y-2 md:space-y-4">
    <h1 class="p-4 text-center text-2xl font-bold">Register Form</h1>
    <form
      @submit.prevent="handleSubmit"
      class="mx-auto flex max-w-md flex-col space-y-2 md:space-y-4"
    >
      <div class="flex flex-col items-center">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="name">
          Name
        </label>
        <input
          class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="name"
          type="text"
          placeholder="Your Full Name"
          v-model="form.name"
        />
        <ul v-if="v$.name.$error">
          <li class="error" v-for="err in v$.name.$errors" :key="err.$uid">
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-center">
        <label class="mb-2 block text-sm font-bold text-gray-700" for="email">
          Email
        </label>
        <input
          class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="email"
          type="email"
          placeholder="Email"
          v-model="form.email"
        />
        <ul v-if="v$.email.$error">
          <li class="error" v-for="err in v$.email.$errors" :key="err.$uid">
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-center">
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="password"
        >
          Password
        </label>
        <input
          class="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="password"
          type="password"
          placeholder="******************"
          v-model="form.password"
        />
        <ul v-if="v$.password.$error">
          <li class="error" v-for="err in v$.password.$errors" :key="err.$uid">
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-center">
        <label
          class="mb-2 block text-sm font-bold text-gray-700"
          for="password_confirmation"
        >
          Confirm Password
        </label>
        <input
          class="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="password_confirmation"
          type="password"
          placeholder="******************"
          v-model="form.password_confirmation"
        />
        <ul v-if="v$.password_confirmation.$error">
          <li
            class="error"
            v-for="err in v$.password_confirmation.$errors"
            :key="err.$uid"
          >
            {{ err.$message }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-center">
        <button
          class="focus:shadow-outline flex w-full items-center justify-center space-x-2 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 focus:outline-none"
          type="submit"
        >
          <loading-button v-if="authStore.loading" />
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.error {
  @apply text-red-500;
}
</style>
