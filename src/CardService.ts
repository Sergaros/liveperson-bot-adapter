import { default as cardContent } from "./adaptiveCard";

let card: any = cardContent;

const set = (data: any) => {
  card = data;
};

const get = () => {
  return card;
};

const reset = () => {
  card = cardContent;
}

export {
  set,
  get,
  reset
}


