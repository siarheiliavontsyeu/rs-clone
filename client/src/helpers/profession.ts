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
