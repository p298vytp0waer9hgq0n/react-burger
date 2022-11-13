import checkResponse from "../check-response";
import { baseUrl, ingredientsUrl } from "../constants";
import request from "../request";
import { TIngredient } from "../types";

export default function fetchIngredients (): Promise<TIngredient[]> {
  return request(`${baseUrl}${ingredientsUrl}`);
}
