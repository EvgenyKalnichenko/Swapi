<template>
  <button
      v-if="!store.items.find(el => el.name === item.name)"
      type="button"
      @click.stop="store.addFavorites(item)"
  >
    Add favorites
  </button>
  <button
      v-else
      type="button"
      @click.stop="store.removeFavorites(item.name)"
  >
    Remove
  </button>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";

defineProps({
  item: {
    type: Object
  }
})

const store = useFavoritesStore();
</script>

<style scoped>

</style>
