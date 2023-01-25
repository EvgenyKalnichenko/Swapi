import { api } from "@/http/api";
import type { ResponseType, PeopleModel } from "@/services/swapi/type";

class SwapiService {
  async getPeople(pageId: string = "1", query: string = "") {
    return await api.get<ResponseType<PeopleModel>>(
      `https://swapi.dev/api/people/?page=${pageId}&search=${query}`
    );
  }

  async getPeopleId(id: string | number) {
    return await api.get(`https://swapi.dev/api/people/${id}`);
  }
}

export const swapiService = new SwapiService();
