<template>
  <div class="about">
    <h1>This people detail detail view</h1>
    <PeopleDetail
        :item="people"
    />
  </div>
</template>

<script setup lang="ts">
import { swapiService } from "@/services/swapi/swapiService";
import { ref } from "vue";
import PeopleDetail from "@/modules/people/PeopleDetail.vue";
import {PeopleModel} from "@/services/swapi/type";

const props = defineProps({
  id: Number,
});

const people = ref({});

try {
  swapiService.getPeopleId(props.id).then((data) => {
    console.log("data", data);
    people.value = data;
  });
} catch (e) {
  console.log("Ошибка");
}
</script>

<style></style>
