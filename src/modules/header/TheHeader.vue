<template>
  <header class="header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/peoples">Peoples</RouterLink>
    </nav>
    <FormSearch class="header__search" />
    <RouterLink class="favorites" to="/favorites">
      <span
          v-if="store.items.length"
          class="favorites__count"
      >
        {{ store.items.length }}
      </span>
      Favorites
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import FormSearch from "@/components/form/FormSearch.vue";

const store = useFavoritesStore();
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 50px;

  &__logo {
    margin-right: 20px;
  }

  &__search {
    margin: 0 auto;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .favorites {
    margin-left: auto;
    position: relative;

    &__count {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid currentColor;
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      justify-content: center;
      position: absolute;
      left: 100%;
      bottom: 50%;
    }
  }
}
</style>
