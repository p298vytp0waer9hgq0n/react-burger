import generateTestBurger from "./test-burger";

export default function fetchIngredients(url, callLoading, callError, callIngr, callBurger) {
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
      // тестовый бургер
      const testBurger = generateTestBurger(resp.data);
      testBurger.forEach((item) => callBurger({type: 'add', value: item}));
    })
    .finally(() => callLoading(false))
    .catch((err) => {
      console.log('Ошибка загрузки ингредиентов: ', err);
      callError(true);
    });
}
