<template>
  <div class="button-wrap">
    <button
        v-if="!store.items.find(el => el.name === item.name)"
        type="button"
        @click.stop="store.addFavorites(item)"
    >
      Add
    </button>
    <button
        v-else
        type="button"
        @click.stop="store.removeFavorites(item.name)"
    >
      Remove
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import type { PeopleModel } from "@/services/swapi/type";
import type { PropType } from "vue";

defineProps({
  item: {
    type: Object as PropType<PeopleModel>,
    default: {}
  }
})

const store = useFavoritesStore();
</script>

<style scoped>
button {
  cursor: pointer;
}

.button-wrap {
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>
