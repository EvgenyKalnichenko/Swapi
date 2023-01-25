<template>
  <h1 class="title-h1">Favorites</h1>
  <EasyDataTable
    :headers="headers"
    :items="store.items"
    :server-items-length="store.items.length"
    @click-row="handlerClick"
    hide-footer
  >
    <template #item-name="item">
      {{ item.name }}
    </template>
    <template #item-events="item">
      <button type="button" @click.stop="store.removeFavorites(item.name)">
        Remove
      </button>
    </template>
    <template #loading>
      <h1>Loading...</h1>
    </template>
  </EasyDataTable>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import type { Header, ClickRowArgument } from "vue3-easy-data-table";
import { goToPeopleDetail } from "@/utils/utils";

const headers: Header[] = [
  { text: "Name", value: "name" },
  { text: "Height", value: "height" },
  { text: "Mass", value: "mass" },
  { text: "Hair Color", value: "hair_color" },
  { text: "Events", value: "events" },
];
const store = useFavoritesStore();

const handlerClick = (item: ClickRowArgument) => {
  goToPeopleDetail(item.url);
};
</script>

<style scoped></style>
