<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>
<template>
  <div class="container mx-auto border">
    <header>
      <slot name="header"><TheHeader /></slot>
    </header>
    <main><slot></slot></main>
    <footer>
      <slot name="footer"><TheFooter></TheFooter></slot>
    </footer>
  </div>
</template>

<style scoped></style>
