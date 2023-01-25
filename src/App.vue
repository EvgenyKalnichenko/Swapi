<script setup lang="ts">
import TheHeader from "@/modules/header/TheHeader.vue";
document.documentElement.setAttribute('prefers-color-scheme', 'dark')
</script>

<template>
  <div class="container">
    <TheHeader />
    <RouterView />
  </div>
</template>

