<template>
  <div class="text-center py-12">
    <div class="animate-bounce">
      <div class="w-16 h-16 mx-auto bg-red-500 rounded-full relative">
        <!-- La ligne du milieu de la pokéball -->
        <div class="absolute inset-x-0 top-1/2 h-2 bg-gray-800"></div>
        <!-- Le cercle central -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-white"
        ></div>
      </div>
    </div>
    <p class="mt-4 font-pokemon text-sm">
      <slot>Capture en cours...</slot>
    </p>
  </div>
</template>
