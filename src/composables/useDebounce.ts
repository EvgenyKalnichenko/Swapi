import { ref } from "vue";

interface InputFileEvent extends Event {
    target: HTMLInputElement;
}

export default function useDebounce(timeoutCount: number = 500) {
    let timeoutRef: null | ReturnType<typeof setTimeout> = null;
    const displayValue = ref("");
    const debouncedValue = ref("");

    const debounceListener = (e: InputFileEvent) => {
        // console.log(e.target.value);
        if (timeoutRef !== null) {
            clearTimeout(timeoutRef);
        }

        displayValue.value = e.target.value ;
        timeoutRef = setTimeout(() => {
            debouncedValue.value = e.target.value;
        }, timeoutCount);
    };

    return { debouncedValue, displayValue, debounceListener };
}
