import router from "@/router";

export const goToPeopleDetail = (url: string = '') => {
    if (!url.length) return false;
    const id = url?.trim();
    const array = id?.split("/");
    const peopleId = array[array?.length - 2] || '';

    router.push(`/peoples/${peopleId}`);
}
