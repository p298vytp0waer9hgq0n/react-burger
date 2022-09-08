import checkResponse from "./check-response";

export default function placeOrder(url, ingredient) {
  return fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "ingredients": ingredient
    })
  })
    .then(checkResponse);
}
