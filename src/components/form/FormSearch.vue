<template>
  <form class="form-search">
    <UiInput
      id="search"
      placeholder="Search"
      type="text"
      @input="debounceListener"
      @focusin="show = true"
      @focusout="show = false"
    />
    <Transition name="slide-fade">
      <div v-if="show" class="form-search__result">
        <ul v-if="result.length">
          <li
              v-for="(item, index) in result"
              :key="index"
              @click="goToPeople(item)"
          >
            {{ item.name }}
          </li>
        </ul>
        <small v-if="!result.length && !loading" class="form-search__small">Not found</small>
        <small v-if="loading" class="form-search__small">Loading...</small>
      </div>
    </Transition>
  </form>
</template>

<script setup lang="ts">
import UiInput from "../ui/UiInput.vue";
import UiButton from "../ui/UiButton.vue";
import {ref, watch} from "vue";
import { swapiService } from "@/services/swapi/swapiService";
import type { PeopleModel } from "@/services/swapi/type";
import router from "@/router";
import { getId } from "@/utils/utils";
import useDebounce from "@/composables/useDebounce";

const result = ref<any>([]);
const loading = ref(false);
const show = ref(false);

const { debouncedValue, debounceListener } = useDebounce();

watch(debouncedValue, () => {
  search();
})

async function search() {
  result.value = [];
  if(debouncedValue.value.length > 0) {
    loading.value = true;
    try {
      await swapiService.getPeople('1', debouncedValue.value).then((data: any) => {
        loading.value = false;
        if (data.results) {
          result.value.push(...data.results);
        }
      });
    } catch (error) {
      console.error("Ошибка", error);
    }
  }
}

function goToPeople(item: PeopleModel) {
  const peopleId = getId(item.url)
  router.push(`/peoples/${peopleId}`);
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
    top: calc(100% + 10px);
    background: #fff;
    width: 100%;
    z-index: 10;
    box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
    max-height: 50vh;
    overflow: auto;

    ul {
      padding: 0;
      list-style: none;

      li {
        cursor: pointer;
        padding: 2px 10px;

        &:hover {
          background: var(--color-background-soft);
        }
      }
    }
  }

  &__small {
    text-align: center;
    padding: 5px;
    display: block;
  }
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
