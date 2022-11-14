import checkResponse from "../check-response";
import { baseUrl, ingredientsUrl } from "../constants";
import request from "../request";
import { TIngredient } from "../types";

export default function fetchIngredients (): Promise<{ data: TIngredient[] }> {
  return request(`${baseUrl}${ingredientsUrl}`);
}
