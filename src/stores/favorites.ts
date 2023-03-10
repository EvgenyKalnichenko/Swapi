import { ref } from "vue";
import { defineStore } from "pinia";
import type { PeopleModel } from "@/services/swapi/type";

export const useFavoritesStore = defineStore("counter", {
  state: () => ({
    favorites: ref<Array<PeopleModel>>(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    ),
  }),
  actions: {
    addFavorites(item: PeopleModel) {
      if (this.favorites.find((el) => el.name === item.name)) return;
      this.favorites.push(item);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    removeFavorites(name: string) {
      this.favorites = this.favorites.filter((el: PeopleModel) => {
        return el.name !== name;
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
  getters: {
    items(state) {
      return state.favorites;
    },
  },
});
