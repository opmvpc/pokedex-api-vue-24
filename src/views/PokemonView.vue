<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import PokemonService from "@/PokemonService";
import PokemonType from "@/components/PokemonType.vue";
import LoadingPokeball from "@/components/LoadingPokeball.vue";
import LazyImage from '@/components/LazyImage.vue'

const route = useRoute();
const pokemon = ref(null);
const loading = ref(true);
const error = ref(null);

// Les stats en français, parce qu'on est chauvins
const statNames = {
  hp: "PV",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Attaque Spé.",
  "special-defense": "Défense Spé.",
  speed: "Vitesse",
};

// Helper pour capitaliser une string (parce que JS c'est pas Ruby...)
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Fonction helper pour transformer les sprites en tableau plat
const flattenSprites = (sprites) => {
  const result = [];

  // Parcours récursif des sprites (parce que c'est plus fun qu'une boucle for)
  const traverse = (obj, category = "") => {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === "string") {
        result.push({
          url: value,
          label: capitalize(`${category} ${key}`.trim().replace(/_/g, " ")),
        });
      } else if (value && typeof value === "object") {
        traverse(value, key);
      }
    }
  };

  traverse(sprites);
  return result;
};

// Un petit computed pour avoir toutes nos images bien propres
const allSprites = computed(() => {
  if (!pokemon.value) return [];
  return flattenSprites(pokemon.value.sprites);
});

onMounted(async () => {
  try {
    pokemon.value = await PokemonService.getPokemonDetails(route.params.id);
  } catch (error) {
    error.value =
      "Ce Pokémon est introuvable ! (comme la stratégie de la Team Rocket)";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading">
    <LoadingPokeball>Capture du Pokémon en cours...</LoadingPokeball>
  </div>

  <div v-else-if="error" class="text-center py-12 text-red-500 font-pokemon">
    {{ error }}
  </div>

  <div v-else class="max-w-4xl mx-auto">
    <!-- En-tête avec image et infos de base -->
    <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
      <div class="relative w-64 h-64">
        <LazyImage
          :src="pokemon.sprites.official_artwork.default"
          :alt="pokemon.name"
          class="w-full h-full object-contain drop-shadow-xl"
        />
      </div>

      <div class="flex-1 text-center md:text-left">
        <div class="font-pokemon text-gray-500 mb-2">
          #{{ pokemon.id.toString().padStart(3, "0") }}
        </div>
        <h1 class="text-4xl font-display font-bold capitalize mb-4">
          {{ pokemon.name }}
        </h1>
        <div class="flex gap-2 justify-center md:justify-start">
          <PokemonType
            v-for="type in pokemon.types"
            :key="type.type.name"
            :type="type.type.name"
          />
        </div>
        <div class="mt-4 grid grid-cols-2 gap-4 text-center">
          <div class="bg-gray-100 p-3 rounded-lg">
            <div class="text-sm text-gray-600">Taille</div>
            <div class="font-bold">{{ pokemon.height }}m</div>
          </div>
          <div class="bg-gray-100 p-3 rounded-lg">
            <div class="text-sm text-gray-600">Poids</div>
            <div class="font-bold">{{ pokemon.weight }}kg</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="bg-white rounded-xl p-6 shadow-lg mb-8">
      <h2 class="font-pokemon text-xl mb-6">Statistiques</h2>
      <div class="space-y-4">
        <div
          v-for="stat in pokemon.stats"
          :key="stat.stat.name"
          class="relative"
        >
          <div class="flex justify-between mb-1">
            <span class="font-medium">{{ statNames[stat.stat.name] }}</span>
            <span class="font-bold">{{ stat.base_stat }}/255</span>
          </div>
          <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all"
              :style="{ width: `${(stat.base_stat / 255) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Capacités -->
    <div class="bg-white rounded-xl p-6 shadow-lg">
      <h2 class="font-pokemon text-xl mb-6">Capacités</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="ability in pokemon.abilities"
          :key="ability.ability.name"
          class="bg-gray-100 p-4 rounded-lg text-center capitalize"
        >
          {{ ability.ability.name.replace("-", " ") }}
        </div>
      </div>
    </div>

    <!-- Notre belle galerie d'images -->
    <div class="mt-8 bg-white rounded-xl p-6 shadow-lg">
      <h2 class="font-pokemon text-xl mb-6">Galerie</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="sprite in allSprites"
          :key="sprite.url"
          class="bg-white p-4 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <div class="aspect-square relative h-32 md:h-48">
            <LazyImage
              :src="sprite.url"
              :alt="`${pokemon.name} - ${sprite.label}`"
            />
          </div>
          <p class="mt-2 text-center text-sm text-gray-600 capitalize">
            {{ sprite.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Un petit helper pour capitaliser les textes */
.capitalize {
  text-transform: capitalize;
}
</style>
