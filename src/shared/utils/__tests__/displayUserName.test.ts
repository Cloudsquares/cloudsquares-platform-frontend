import { displayUserName } from "@/shared/utils/displayUserName";
import { describe, expect, it } from "vitest";

describe("displayUserName", () => {
  it("возвращает дефолтные значения, если данные отсутствуют", () => {
    expect(displayUserName({})).toEqual({ shortName: "-", fullName: "-" });
  });

  it("формирует полное и короткое имя", () => {
    expect(
      displayUserName({
        first_name: "Иван",
        last_name: "Иванов",
        middle_name: "Иванович",
      }),
    ).toEqual({
      shortName: "Иванов Иван",
      fullName: "Иванов Иван Иванович",
    });
  });

  it("опускает пустые части имени", () => {
    expect(
      displayUserName({
        first_name: "Анна",
        last_name: null,
        middle_name: undefined,
      }),
    ).toEqual({ shortName: "Анна", fullName: "Анна" });
  });
});
