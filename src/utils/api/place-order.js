import checkResponse from "../check-response";
import { baseUrl, orderUrl } from "../constants";

export default function placeOrder({ ingredients, accToken }) {
  return fetch(`${baseUrl}${orderUrl}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: accToken
    },
    body: JSON.stringify({
      "ingredients": ingredients
    })
  })
    .then(checkResponse);
}
