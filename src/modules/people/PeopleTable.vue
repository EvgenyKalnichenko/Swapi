<template>
  <div class="catalog">
    <div class="catalog__search">
      <UiInput
          id="search"
          v-model="searchValue"
          placeholder="Search"
          type="text"
          @input="searchPeople"
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
        <button type="button" @click.stop="store.addFavorites(item)">
          Add
        </button>
        <button type="button" @click.stop="store.removeFavorites(item.name)">
          Remove
        </button>
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
import { swapiService } from "@/services/swapi/swapiService";
import type { PeopleModel } from "@/services/swapi/type";
import type {
  Header,
  ServerOptions,
  ClickRowArgument,
} from "vue3-easy-data-table";
import { useFavoritesStore } from "@/stores/counter";

const headers: Header[] = [
  { text: "Name", value: "name" },
  { text: "Height", value: "height" },
  { text: "Mass", value: "mass" },
  { text: "Hair Color", value: "hair_color" },
  { text: "Events", value: "events" },
];

const searchValue = ref("");

const store = useFavoritesStore();

const handlerClick = (item: ClickRowArgument) => {
  const id = item.url?.trim();
  const array = id?.split("/");
  const peopleId = array[array?.length - 2] || 0;
  router.push(`peoples/${peopleId}`);
};

const peoples = ref<Array<PeopleModel> | []>([]);
const serverItemsLength = ref(0);
const loading = ref(false);

const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 10,
});

let debounse = null;

function searchPeople() {
  if (debounse) clearTimeout(debounse);
  debounse = setTimeout(loadFromServer, 500);
}

const loadFromServer = async (pageId: string = '1') => {
  loading.value = true;
  try {
    await swapiService.getPeople(pageId, searchValue.value).then((data) => {
      if (data.results) {
        peoples.value = data.results;
        serverItemsLength.value = data.count;
        loading.value = false;
      }
    });
  } catch (error) {
    console.error("Ошибка", error);
  }
};

loadFromServer();

watch(
  serverOptions,
  (value) => {
    loadFromServer(String(value.page));
  },
  { deep: true }
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
