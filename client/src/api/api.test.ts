import { it, describe, expect } from "vitest";

describe("RequestTemplate", () => {
  it("should work correctly", () => {
    const apiKeys = ["1", "2", "3", "4", "5", "6", "7"];
    let currentIndex = 0;
    let requestsMade = 0;
    const requestTemplate = () => {
      requestsMade++;
      if (requestsMade >= 500) {
        currentIndex++;
        requestsMade = 0;
      }
      return apiKeys[currentIndex];
    };
    for (let i = 0; i < 1000; i++) {
      requestTemplate();
    }
    expect(requestTemplate()).toBe("3");
  });
});
