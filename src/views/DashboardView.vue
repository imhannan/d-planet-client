<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <div class="flex flex-col space-y-2 px-10 py-4 md:space-y-4">
    <h1 class="text-3xl">
      Hi, {{ auth.user.name }}. Welcome to your dashboard
    </h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
      doloribus ratione incidunt a similique aperiam repellendus rem architecto
      doloremque quo voluptatem expedita quasi necessitatibus deleniti ea
      voluptatum fuga consequuntur quam, voluptatibus ex soluta. Nisi temporibus
      omnis eaque. Suscipit, debitis nemo.
    </p>
  </div>
</template>

<style scoped></style>
