<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-red-700 to-red-600">
    <header class="bg-red-600 border-b-8 border-red-800 shadow-lg relative">
      <div class="container mx-auto px-4">
        <div class="flex items-center h-16 md:h-20">
          <!-- LED principale et petites LEDs -->
          <div class="flex items-center gap-2 md:gap-3">
            <div
              class="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-white"
            >
              <div
                class="w-full h-full rounded-full bg-blue-400 shadow-inner animate-pulse"
              ></div>
            </div>
            <div class="flex gap-1 md:gap-2">
              <div
                class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400 border border-red-600"
              ></div>
              <div
                class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400 border border-yellow-600"
              ></div>
              <div
                class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 border border-green-600"
              ></div>
            </div>
          </div>

          <RouterLink to="/">
            <h1
              class="text-xl md:text-3xl font-pokemon text-white ml-4 tracking-wider"
            >
              Pokédex
            </h1>
          </RouterLink>

          <!-- Grille de ventilation responsive -->
          <div class="ml-auto mr-2 md:mr-4">
            <div class="flex gap-0.5 md:gap-1">
              <div v-for="n in 8" :key="n" class="flex flex-col gap-0.5">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="w-3 md:w-5 h-1 md:h-1.5 bg-red-900/50 rounded-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] relative overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"
                  ></div>
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="container mx-auto px-4 py-8">
      <div
        class="bg-white rounded-2xl shadow-2xl p-6 min-h-[calc(100vh-theme(space.32))] border-4 border-gray-200"
      >
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
/* Ajout d'une texture subtile */
.bg-gradient-to-b {
  background-image: linear-gradient(
      to bottom,
      var(--tw-gradient-from),
      var(--tw-gradient-to)
    ),
    url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
