import checkResponse from "../check-response";
import { baseUrl, orderUrl } from "../constants";
import request from "../request";
import { TIngredientsIds } from "../types";

export default function placeOrder({ ingredients, accToken }: TIngredientsIds & { accToken: string; }) {
  return request(`${baseUrl}${orderUrl}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: accToken
    },
    body: JSON.stringify({
      "ingredients": ingredients
    })
  });
}
