export const getId = (url: string = '') => {
    if (!url.length) return false;
    const id = url?.trim();
    const array = id?.split("/");
    return array[array?.length - 2] || '';
}
