<script setup>
import { ref } from "vue";

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
});

const isLoading = ref(true);
const hasError = ref(false);

const handleLoad = () => {
  isLoading.value = false;
};

const handleError = () => {
  isLoading.value = false;
  hasError.value = true;
};
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Loading state -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="w-8 h-8 animate-bounce">
        <div class="w-full h-full bg-red-500 rounded-full relative">
          <div class="absolute inset-x-0 top-1/2 h-0.5 bg-gray-800"></div>
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rounded-full border border-white"
          ></div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-if="hasError"
      class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
    >
      <span class="text-sm text-gray-500">MissingNo.</span>
    </div>

    <!-- Actual image -->
    <img
      :src="src"
      :alt="alt"
      :class="[
        'w-full h-full transition-opacity duration-300',
        { 'opacity-0': isLoading },
        'object-contain p-4'
      ]"
      @load="handleLoad"
      @error="handleError"
      loading="lazy"
    />
  </div>
</template>
