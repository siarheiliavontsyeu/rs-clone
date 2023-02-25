import { describe, it, expect } from "vitest";
import { formatDate, personDate } from "../date";
describe("date helpers", () => {
  it("should return correct date", () => {
    const date = new Date("05 October 2011 14:48 UTC");
    const res = formatDate(date.toISOString());
    expect(res).toBe("05.10.2011, 20:48");
  });
  it("should return correct person date with age", () => {
    const date = new Date("05 October 2011 14:48 UTC");
    const res = personDate(date.toISOString());
    expect(res).lengthOf(2);
    expect(res[0]).toBe("5 октября 2011 г.");
    expect(res[1]).toBe(11);
  });
  it("should return correct person date without age", () => {
    const date = new Date("05 October 2011 14:48 UTC");
    const res = personDate(date.toISOString(), false);
    expect(res).toBeTypeOf('string');
    expect(res).toBe("5 октября 2011 г.");
  });
});
