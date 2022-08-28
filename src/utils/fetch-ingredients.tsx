import checkResponse from "./check-response";

export default function fetchIngredients (url:string): Promise<any> {
  return fetch(url)
    .then(checkResponse);
}
