// test-burger
import generateTestBurger from "./test-burger";

export default function fetchIngredients(url, callLoading, callError, callIngr, callTest) {
  callLoading(true);
  fetch(url)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log('Ошибка связи с сервером');
        return Promise.reject(resp.status);
      }
    })
    .then((resp) => {
      callError(false);
      callIngr(resp.data);
      callTest(generateTestBurger(resp.data)); // test-burger
    })
    .finally(() => callLoading(false))
    .catch((err) => {
      console.log('Ошибка загрузки ингредиентов: ', err);
      callError(true);
    });
}
