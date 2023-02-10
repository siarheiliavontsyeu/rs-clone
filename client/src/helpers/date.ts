export const formatDate = (date: string) => {
  const date_ = new Date(date);
  return date_.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
