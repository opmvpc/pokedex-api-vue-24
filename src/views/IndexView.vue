<script setup>
import { ref, onMounted, computed } from "vue";
import Fuse from "fuse.js";
import PokemonService from "@/PokemonService";
import PokemonType from "@/components/PokemonType.vue";
import LoadingPokeball from "@/components/LoadingPokeball.vue";
import LazyImage from '@/components/LazyImage.vue'

const pokemons = ref([]);
const loading = ref(false);
const error = ref(null);
const searchQuery = ref("");

// Configuration de Fuse.js - on garde ça simple !
const fuseOptions = {
  keys: ["name", "id"], // Les champs à rechercher
  threshold: 0.5, // Plus c'est bas, plus c'est strict
  includeScore: true,
};

// On initialise Fuse quand les pokémons sont chargés
const fuse = computed(() => new Fuse(pokemons.value, fuseOptions));

// La magie opère ici
const filteredPokemons = computed(() => {
  if (!searchQuery.value) return pokemons.value;

  // Fuse nous retourne un tableau avec les scores, on veut juste les pokémons
  return fuse.value.search(searchQuery.value).map((result) => result.item);
});

const loadPokemons = async () => {
  loading.value = true;
  error.value = null;

  try {
    pokemons.value = await PokemonService.getPokemons();
  } catch (error) {
    error.value = "Impossible de capturer les Pokémon !";
  } finally {
    loading.value = false;
  }
};

onMounted(loadPokemons);
</script>

<template>
  <div class="space-y-6">
    <!-- Barre de recherche -->
    <div class="relative max-w-2xl mx-auto">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un Pokémon..."
        class="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all text-lg"
      />
    </div>

    <!-- Affichage des Pokémon -->
    <div v-if="loading">
      <LoadingPokeball>Chargement du Pokédex...</LoadingPokeball>
    </div>
    <div v-else-if="error" class="text-center py-12 text-red-500 font-pokemon">
      {{ error }}
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <router-link
        :to="{ name: 'pokemon', params: { id: pokemon.id }}"
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-red-500 hover:shadow-lg transition-all"
      >
        <div class="flex flex-col items-center space-y-2">
          <span class="font-pokemon text-xs text-gray-500">
            #{{ pokemon.id.toString().padStart(3, "0") }}
          </span>
          <LazyImage
            :src="pokemon.sprites.official_artwork.default"
            :alt="pokemon.name"
            class="w-full h-32 object-contain"
          />
          <h2 class="font-display font-semibold text-lg capitalize">
            {{ pokemon.name }}
          </h2>
          <div class="flex gap-2 justify-center">
            <PokemonType
              v-for="type in pokemon.types"
              :key="type.type.name"
              :type="type.type.name"
            />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
