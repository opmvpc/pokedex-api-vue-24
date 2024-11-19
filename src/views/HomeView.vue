<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <div class="space-y-6">
    <!-- Barre de recherche -->
    <div class="relative max-w-2xl mx-auto">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un Pokémon..."
        class="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200
               focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none
               transition-all text-lg"
      />
      <div class="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
        <div class="w-2 h-6 bg-red-400 rounded-full opacity-75"></div>
        <div class="w-2 h-6 bg-red-400 rounded-full opacity-75"></div>
      </div>
    </div>

    <!-- Grille de Pokémon -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Ici, tu mettras ta liste de Pokémon filtrée -->
      <div v-for="i in 12" :key="i"
           class="bg-gray-50 rounded-lg p-4 border-2 border-gray-200
                  hover:border-red-500 hover:shadow-lg transition-all
                  cursor-pointer">
        <div class="w-full aspect-square bg-gray-200 rounded-lg mb-2"></div>
        <div class="text-center font-medium">Pokemon #{{ i }}</div>
      </div>
    </div>
  </div>
</template>
