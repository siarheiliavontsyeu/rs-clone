import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useSearchStore } from "../searchStore";
import { useAuthStore } from "../authStore";

describe("Stores", () => {
  setActivePinia(createPinia());
  it("searchStore should work correctly", () => {
    const searchStore = useSearchStore();
    expect(searchStore.isLoading).toBeFalsy();
    searchStore.setIsLoading();
    expect(searchStore.isLoading).toBeTruthy();
    searchStore.unsetIsLoading();
    expect(searchStore.isLoading).toBeFalsy();
  });
  it("authStore should work correctly", () => {
    const authStore = useAuthStore();
    authStore.user = {
      id: "4",
      login: "string",
      name: "clone",
      subscription: "default",
    };
    authStore.logout();
    expect(authStore.user).toBeNull();
  });
});
