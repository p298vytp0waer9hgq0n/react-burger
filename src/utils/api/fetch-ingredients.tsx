import checkResponse from "../check-response";
import { baseUrl, ingredientsUrl } from "../constants";
import request from "../request";

export default function fetchIngredients (): Promise<any> {
  return request(`${baseUrl}${ingredientsUrl}`);
}
