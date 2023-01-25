<template>
  <div class="about">
    <h1 class="title-h1">People</h1>
    <PeopleDetail
        :loading="isLoading"
        :item="people"
    />
  </div>
</template>

<script setup lang="ts">
import { swapiService } from "@/services/swapi/swapiService";
import { ref } from "vue";
import PeopleDetail from "@/modules/people/PeopleDetail.vue";
import type { PeopleModel } from "@/services/swapi/type";

const props = defineProps({
  id: Number,
});
// TODO fix type for people
const people = ref<any>(null);
const isLoading = ref(false);
try {
  isLoading.value = true;
  swapiService.getPeopleId(String(props.id)).then((data) => {
    people.value = data;
    isLoading.value = false;
  });
} catch (e) {
  console.error(e);
  isLoading.value = false;
}
</script>

<style></style>
