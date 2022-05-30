<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-5">
    <aside class="col-span-1 border-r">
      <ul class="flex h-full flex-col space-y-2">
        <li class="">
          <router-link class="p-2" :to="{ name: 'admin.dashboard' }"
            >Dashboard</router-link
          >
        </li>
        <li class="">
          <router-link class="p-2" :to="{ name: 'admin.users' }"
            >Users</router-link
          >
        </li>
      </ul>
    </aside>
    <div class="col-span-4 p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-green-500;
}
</style>
