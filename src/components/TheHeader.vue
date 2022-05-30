<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const auth = useAuthStore();

async function logout() {
  const isLoggedOut = await auth.logout();
  if (isLoggedOut) {
    router.push({ name: "home" });
  } else {
    alert("Something went wrong");
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between bg-green-500 p-4 text-white">
      <router-link to="/">DPlanet</router-link>
      <ul class="flex items-center space-x-2 md:space-x-4">
        <li>
          <router-link v-if="!auth.isLoggedIn" class="button" to="/"
            >Login</router-link
          >
        </li>
        <li>
          <router-link v-if="!auth.isLoggedIn" class="button" to="/register"
            >Register</router-link
          >
        </li>
        <li>
          <router-link
            v-if="auth.isLoggedIn && auth.user.role === 'admin'"
            class="button"
            :to="{ name: 'admin.dashboard' }"
            >Dashboard</router-link
          >
          <router-link v-else class="button" :to="{ name: 'dashboard' }"
            >Dashboard</router-link
          >
        </li>
        <li>
          <button
            v-if="auth.isLoggedIn"
            @click="logout"
            class="button"
            to="/dashboard"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.button {
  @apply rounded-md border border-white p-2 hover:bg-white hover:text-green-500;
}
</style>
