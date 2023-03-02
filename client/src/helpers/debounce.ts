export function debounce(fn: (value: string) => void, wait: number) {
  let timer: NodeJS.Timeout;
  return function (args: string) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    } // get the current context
    timer = setTimeout(() => {
      fn.call(null, args); // call the function if time expires
    }, wait);
  };
}
