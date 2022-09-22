import checkResponse from "./check-response";
import { baseUrl, ingredientsUrl } from "./constants";

export default function fetchIngredients (): Promise<any> {
  return fetch(`${baseUrl}${ingredientsUrl}`)
    .then(checkResponse);
}
