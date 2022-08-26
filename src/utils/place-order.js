export default function placeOrder(url, ingredient) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ingredient
    })
  })
    .then((resp) => {
      if (resp.ok) {
        console.log(resp.json());
      }
    })
    .catch((resp) => {
      console.log(`Ошибка размещения заказа: ${resp.status}`);
    })
}
