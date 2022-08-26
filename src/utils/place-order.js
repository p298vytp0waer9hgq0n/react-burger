export default function placeOrder(url, ingredient) {
  return fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "ingredients": ingredient
    })
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return Promise.reject(`${resp.status} ${resp.statusText}`);
      }
    })
    .catch((err) => {
      console.log(`Ошибка размещения заказа: ${err}`);
    })
}
