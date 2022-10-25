import checkResponse from "../check-response";
import { baseUrl, orderUrl } from "../constants";

export default function placeOrder(data) {
  console.log('order request');
  return fetch(`${baseUrl}${orderUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "ingredients": data
    })
  })
    .then(checkResponse);
}
