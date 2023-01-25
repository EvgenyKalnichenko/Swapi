<template>
  <div class="catalog">
    <div class="catalog__search">
      <UiInput
          id="search"
          placeholder="Search"
          type="text"
          @input="debounceListener"
      />
    </div>
    <EasyDataTable
        v-model:server-options="serverOptions"
        :headers="headers"
        :loading="loading"
        :items="peoples"
        :server-items-length="serverItemsLength"
        @click-row="handlerClick"
        buttons-pagination
    >
      <template #item-name="item">
        {{ item.name }}
      </template>
      <template #item-events="item">
        <PeopleButtonFavorites
          :item="item"
        />
      </template>
      <template #loading>
        <h1>Loading...</h1>
      </template>
    </EasyDataTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import router from "@/router";
import UiInput from "@/components/ui/UiInput.vue";
import PeopleButtonFavorites from "@/modules/people/PeopleButtonFavorites.vue";
import {goToPeopleDetail} from "@/utils/utils";
import { swapiService } from "@/services/swapi/swapiService";
import type { PeopleModel } from "@/services/swapi/type";
import type {
  Header,
  ServerOptions,
  ClickRowArgument,
} from "vue3-easy-data-table";
import { useFavoritesStore } from "@/stores/favorites";
import useDebounce from "@/composables/useDebounce";

const headers: Header[] = [
  { text: "Name", value: "name" },
  { text: "Height", value: "height" },
  { text: "Mass", value: "mass" },
  { text: "Hair Color", value: "hair_color" },
  { text: "Events", value: "events" },
];

const store = useFavoritesStore();

const handlerClick = (item: ClickRowArgument) => {
  goToPeopleDetail(item.url)
};

const peoples = ref<Array<PeopleModel> | []>([]);
const serverItemsLength = ref(0);
const loading = ref(false);

const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 10,
});

const { debouncedValue, debounceListener } = useDebounce();

const loadFromServer = async (pageId: string = '1') => {
  loading.value = true;
  try {
    await swapiService.getPeople(pageId, debouncedValue.value).then((data) => {
      loading.value = false;
      if (data.results) {
        peoples.value = data.results;
        serverItemsLength.value = data.count;
      }
    });
  } catch (error) {
    loading.value = false;
    console.error("Ошибка", error);
  }
};

loadFromServer();

watch(debouncedValue, () => {
  loadFromServer();
})

watch(serverOptions, (value) => {
    loadFromServer(String(value.page));
  }, { deep: true }
);
</script>

<style lang="scss">
.catalog {
  &__search {
    margin-bottom: 15px;
  }
}
.pagination__rows-per-page {
  display: none !important;
}
</style>
