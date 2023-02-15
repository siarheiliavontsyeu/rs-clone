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

export const personDate = (date: string, allowAge: boolean = true) => {  
  const date_ = new Date(date);
  const today = new Date();
  let age = today.getFullYear() - date_.getFullYear();
  const month = today.getMonth() - date_.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date_.getDate())) {
    age--;
  }
  const birthdate = date_.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const arr = allowAge ? [birthdate, age] : birthdate;
  return arr;
};
