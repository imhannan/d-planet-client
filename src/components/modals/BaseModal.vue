<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: "auto",
  },
  footer: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <teleport to="body">
    <div class="modal-container">
      <div
        class="relative"
        :class="{
          'w-4/5': size == 'lg',
          'w-3/5': size == 'md',
          'w-2/5': size == 'sm',
        }"
      >
        <button
          class="absolute -top-2 -right-2 z-20 rounded-full shadow-lg"
          @click="emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="h-8 w-8 fill-red-500 duration-300 hover:fill-red-700"
          >
            <path
              d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
            />
          </svg>
        </button>
        <div class="modal">
          <div class="modal-header">
            <slot name="header">Modal Header</slot>
          </div>
          <div class="modal-body"><slot></slot></div>
          <div class="modal-footer" v-if="footer">
            <slot name="footer">Modal Footer</slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-container {
  @apply fixed top-0 right-0 left-0 bottom-0 z-10 grid h-screen w-full place-items-center bg-black/50;
}
.modal {
  @apply flex flex-col overflow-hidden rounded-lg bg-white shadow-lg;
}

.modal-header {
  @apply border-b p-4 text-center text-2xl font-bold;
}

.modal-body {
  @apply p-4;
}

.modal-footer {
  @apply flex items-center justify-center space-x-2 border-t p-4 text-center md:space-x-4;
}
</style>
