<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
});

// Map des couleurs par type avec dégradés et ombres
const typeStyles = {
  normal: "from-gray-400 to-gray-500",
  fire: "from-red-500 to-red-600",
  water: "from-blue-400 to-blue-500",
  electric: "from-yellow-300 to-yellow-400",
  grass: "from-green-400 to-green-500",
  ice: "from-blue-200 to-blue-300",
  fighting: "from-red-600 to-red-700",
  poison: "from-purple-400 to-purple-500",
  ground: "from-yellow-600 to-yellow-700",
  flying: "from-indigo-300 to-indigo-400",
  psychic: "from-pink-400 to-pink-500",
  bug: "from-lime-400 to-lime-500",
  rock: "from-yellow-700 to-yellow-800",
  ghost: "from-purple-600 to-purple-700",
  dragon: "from-indigo-500 to-indigo-600",
  dark: "from-gray-700 to-gray-800",
  steel: "from-gray-400 to-gray-500",
  fairy: "from-pink-300 to-pink-400",
};
</script>

<template>
  <span
    class="flex items-center justify-center px-3 py-1 rounded-full text-white text-sm font-medium capitalize shadow-inner border border-white/10 bg-gradient-to-br relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
    :class="typeStyles[type.toLowerCase()] || 'from-gray-400 to-gray-500'"
  >
    <!-- Effet de brillance -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"
    ></div>

    <!-- Texte avec petit effet d'ombre -->
    <span class="relative drop-shadow-sm text-white/80 text-xs">{{
      type
    }}</span>
  </span>
</template>
