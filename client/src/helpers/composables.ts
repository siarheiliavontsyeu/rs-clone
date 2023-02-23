export const professionInRu = (profession: string) => {
  switch (profession) {
    case "WRITER":
      return "Сценарист";
    case "OPERATOR":
      return "Оператор";
    case "EDITOR":
      return "Редактор";
    case "COMPOSER":
      return "Композитор";
    case "PRODUCER_USSR":
      return "";
    case "HIMSELF":
      return "Актер: играет самого себя";
    case "HERSELF":
      return "Актриса: играет саму себя";
    case "HRONO_TITR_MALE":
      return "В титрах не указан";
    case "HRONO_TITR_FEMALE":
      return "В титрах не указана";
    case "TRANSLATOR":
      return "Переводчик";
    case "DIRECTOR":
      return "Режиссер";
    case "DESIGN":
      return "Дизайнер";
    case "PRODUCER":
      return "Продюсер";
    case "ACTOR":
      return "Актер";
    case "VOICE_DIRECTOR":
      return "Озвучивает";
    default:
      return "Неизвестно";
  }
};

export const properEndingInRu = (value: number): string => {
  const str = String(value);
  const lastNum = str.at(-1);
  if (value === 1) return "фильм";
  else if (lastNum === "2" || lastNum === "3" || lastNum === "4")
    return "фильма";
  else return "фильмов";
};

export const properRatingMpaa = (rating: string): [string, string] => {
  switch (rating) {
    case "g":
      return ["g", "Нет возрастных ограничений"];
    case "pg":
      return ["pg", "Рекомендуется присутствие родителей"];
    case "pg13":
      return ["pg-13", "Детям до 13 лет просмотр не желателен"];
    case "r":
      return ["pg-13", "Лицам до 17 лет обязательно присутствие взрослого"];
    case "nc17":
      return ["nc-17", "Лицам до 18 лет просмотр запрещен"];
    default:
      return ["Неизвестно", "Неизвестно"];
  }
};

export const properMoney = (amount?: number): string => {
  if (amount) {
    const number = new Intl.NumberFormat("en-US", {
      style: "decimal",
    });
    return number.format(amount);
  } else return "--";
};

export const properText = (text: string): string => {
  return text
    .replace(/<(.*?)>/g, "")
    .replace(/&laquo;/gm, "«")
    .replace(/&raquo;/gm, "»")
    .replace(/&#171;/gm, "«")
    .replace(/&#187;/gm, "»")
    .replace(/&#160;/gm, " ")
    .replace(/&#8217;/gm, "'");
};

export const properRates = (rate: number): string => {
  const number = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });
  const str = String(rate);
  if (str.at(-1) === "1") return `${number.format(rate)} оценка`;
  if (str.at(-1) === "2") return `${number.format(rate)} оценки`;
  else return `${number.format(rate)} оценок`;
};

export const ratingColor = (rating: number): string => {
  if (rating < 5) return "red";
  if (rating >= 5 && rating < 7) return "gray";
  else return "green";
};
