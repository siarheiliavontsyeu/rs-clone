import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", () => {
  const searchText = ref('');
  const loweredSearchText = computed(() =>
    searchText.value.toLocaleLowerCase()
  );
  const setSearchText = (newSearchText: string) => {
    searchText.value = newSearchText;
    console.log(searchText.value);
    
  };

  return { searchText, loweredSearchText, setSearchText };
});
