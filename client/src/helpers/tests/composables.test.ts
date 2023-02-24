import { describe, expect, it} from "vitest";
import {
  professionInRu,
  properEndingInRu,
  properRatingMpaa,
  properText,
  properRates,
  ratingColor,
} from "../composables";

describe("profession in russian", () => {
  it("returns profession string", () => {
    const correct = professionInRu("WRITER");
    const incorrect = professionInRu("TRANSLATOR");
    const def = professionInRu("unknown");
    expect(correct).toBe("Сценарист");
    expect(incorrect).not.toBe("Неизвестно");
    expect(def).toBe("Неизвестно");
  });
});

describe("movies string ending in russian", () => {
  it("returns correct ending", () => {
    const others = properEndingInRu(70);
    const twoThreeFour = properEndingInRu(33);
    const one = properEndingInRu(1);
    const def = properEndingInRu(10);
    expect(others).toBe("фильмов");
    expect(twoThreeFour).not.toBe("фильмов");
    expect(twoThreeFour).toBe("фильма");
    expect(one).toBe("фильм");
    expect(def).toBe("фильмов");
  });
});

describe("mpaa movie rating", () => {
  it("return array of rating string and description", () => {
    const correct = properRatingMpaa("g");
    const def = properRatingMpaa("unknown");
    expect(correct).lengthOf(2);
    expect(correct[0]).toBe("g");
    expect(correct[1]).toBe("Нет возрастных ограничений");
    expect(correct[1]).not.toBe("Лицам до 18 лет просмотр запрещен");
    expect(def).not.lengthOf(0);
    expect(def[0]).toBe(def[1]);
  });
});

describe("review description without html entities", () => {
  it("returns string of text with symbols, not html entities", () => {
    const text = "<div>SOme&#187; text &raquo;</div>";
    const res = properText(text);
    expect(res).toBe("SOme» text »");
  });
});

describe("review ratings count proper ending", () => {
  it("returns string of text for ratings count", () => {
    const one = properRates(1);
    const two = properRates(2);
    const others = properRates(75);
    expect(one).toBe("1 оценка");
    expect(two).toBe("2 оценки");
    expect(two).not.toBe("1 оценка");
    expect(others).toBe("75 оценок");
  });
});

describe("rating numbers color", () => {
  it("returns correct string of color", () => {
    const medium = ratingColor(5.5);
    const high = ratingColor(8);
    const low = ratingColor(3.7);
    expect(medium).toBe("gray");
    expect(high).toBe("green");
    expect(low).toBe("red");
  });
});
