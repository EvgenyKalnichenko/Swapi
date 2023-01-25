<template>
  <div class="about">
    <h1 class="title-h1">People</h1>
    <PeopleDetail v-if="id" :id="id" />
  </div>
</template>

<script setup lang="ts">
import PeopleDetail from "@/modules/people/PeopleDetail.vue";

defineProps({
  id: Number,
});
</script>

<style></style>
