<template>
  <form class="form-search">
    <UiInput
      id="search"
      v-model="searchValue"
      placeholder="Search"
      type="text"
      @input="search"
    />
    <div class="form-search__button">
      <UiButton type="submit"> Submit </UiButton>
    </div>
    <Transition name="slide-fade">
      <div v-if="!loading && searchValue.length" class="form-search__result">
        <ul>
          <li v-for="(item, index) in result" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </Transition>
  </form>
</template>

<script setup lang="ts">
import UiInput from "../ui/UiInput.vue";
import UiButton from "../ui/UiButton.vue";
import { ref } from "vue";
import { swapiService } from "@/services/swapi/swapiService";

const searchValue = ref("");
const result = ref([]);
const loading = ref(false);

async function search() {
  loading.value = true;
  try {
    await swapiService.getPeople(1, searchValue.value).then((data) => {
      if (data.results) {
        result.value = data.results;
        loading.value = false;
      }
    });
  } catch (error) {
    console.error("Ошибка", error);
  }
}
</script>

<style lang="scss" scoped>
.form-search {
  display: inline-flex;
  align-items: center;
  position: relative;
  max-width: 300px;
  width: 100%;

  &__result {
    position: absolute;
    top: 100%;
    background: #fff;
    width: 100%;
    z-index: 10;
  }
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.45s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
