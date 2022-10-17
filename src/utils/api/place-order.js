import checkResponse from "../check-response";
import { baseUrl, orderUrl } from "../constants";

export default function placeOrder(data) {
  return fetch(`${baseUrl}${orderUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "ingredients": data
    })
  })
    .then(checkResponse);
}
