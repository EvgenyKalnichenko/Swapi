<template>
  <EasyDataTable
      v-if="id && !error"
      :headers="headers"
      :items="[people]"
      :server-items-length="1"
      :loading="isLoading"
      hide-footer
  >
    <template #loading>
      <h1>Loading...</h1>
    </template>
    <template #item-created="item">
      {{ formatsDate(item.created) }}
    </template>
    <template #item-edited="item">
      {{ formatsDate(item.edited) }}
    </template>
    <template #item-name="item">
      {{ item.name }}
    </template>
    <template #item-events="item">
      <PeopleButtonFavorites
          :item="item"
      />
    </template>
    <template #item-films="item">
      <ul>
        <li v-for="(film, index) in item.films">
          <a :href="film" target="_blank">{{ film }}</a>
        </li>
      </ul>
    </template>
    <template #item-starships="item">
      <ul>
        <li v-for="(starship, index) in item.starships">
          <a :href="starship" target="_blank">{{ starship }}</a>
        </li>
      </ul>
    </template>
    <template #item-vehicles="item">
      <ul>
        <li v-for="(vehicle, index) in item.vehicles">
          <a :href="vehicle" target="_blank">{{ vehicle }}</a>
        </li>
      </ul>
    </template>
  </EasyDataTable>
  <div v-else>{{error}}</div>
</template>

<script lang="ts" setup>
import type { Header } from "vue3-easy-data-table";
import PeopleButtonFavorites from "@/modules/people/PeopleButtonFavorites.vue";
import { ref } from "vue";
import { swapiService } from "@/services/swapi/swapiService";

const headers: Header[] = [
  { text: "Created", value: "created" },
  { text: "Edited", value: "edited" },
  { text: "Name", value: "name" },
  { text: "Height", value: "height" },
  { text: "Mass", value: "mass" },
  { text: "Eye color", value: "eye_color" },
  { text: "Hair Color", value: "hair_color" },
  { text: "Films", value: "films" },
  { text: "Starships", value: "starships" },
  { text: "Vehicles", value: "vehicles" },
  { text: "Events", value: "events" },
];

const props = defineProps({
  id: {
    type: Number,
  },
});

// TODO fix type for people
const people = ref<any>({});
const isLoading = ref(false);
const error = ref('');
try {
  isLoading.value = true;
  swapiService.getPeopleId(String(props.id)).then((data) => {
    console.log('getPeopleId', data)
    if(data.name) {
      people.value = data;
    } else {
      error.value = 'Not found'
    }

    isLoading.value = false;
  });
} catch (e) {
  console.error(e);
  isLoading.value = false;
}

function formatsDate(date: string) {
  const create = new Date(date)
  return create.toLocaleDateString()
}
</script>

<style scoped>
ul {
  padding: 0;
  list-style: none;
}
</style>
