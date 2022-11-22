export const baseUrl = 'https://norma.nomoreparties.space/api/';
export const basename = '/react-burger';
export const ingredientsUrl = 'ingredients';
export const orderUrl = 'orders';
export const registerUrl = 'auth/register';
export const loginUrl = 'auth/login';
export const refreshUrl = 'auth/token';
export const userUrl = 'auth/user';
export const resetUrl = 'password-reset';
export const newPwUrl = 'password-reset/reset';
export const logoutUrl = 'auth/logout';
export const allOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
export const userOrdersUrl = 'wss://norma.nomoreparties.space/orders';
export const modalRoot = document.getElementById('modal-root');


export const dragTypes = {
  ingredient: 'ingredient',
  sorting: 'ingredient/sort'
}

export const ingrTypes = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main'
}

export const statusText = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан'
}
