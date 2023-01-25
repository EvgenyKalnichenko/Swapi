<template>
  <EasyDataTable
      v-if="item"
      :headers="headers"
      :items="[item]"
      :server-items-length="1"
      hide-footer
  >
    <template #item-name="item">
      {{ item.name }}
    </template>
    <template #item-events="item">
      <button type="button">
        Remove
      </button>
    </template>
    <template #loading>
      <h1>Loading...</h1>
    </template>
  </EasyDataTable>
</template>

<script lang="ts" setup>
import type { Header } from "vue3-easy-data-table";
import { computed, ref, watch } from "vue";

const headers: Header[] = [
  { text: "Name", value: "name" },
  { text: "Height", value: "height" },
  { text: "Mass", value: "mass" },
  { text: "Hair Color", value: "hair_color" },
  { text: "Events", value: "events" },
];
const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
});

watch(props.item, () => {

})

</script>

<style scoped></style>
