import checkResponse from "./check-response";

export default function placeOrder({ url, data }) {
  return fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "ingredients": data
    })
  })
    .then(checkResponse);
}
