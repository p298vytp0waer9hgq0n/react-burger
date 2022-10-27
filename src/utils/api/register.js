import checkResponse from "../check-response";
import { baseUrl, registerUrl } from "../constants";
import { setCookie } from "../set-cookie";

export default function register ({ username, email, password }) {
  return fetch(`${baseUrl}${registerUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "name": username,
      "email": email,
      "password": password
    })
  }).then(checkResponse).then((resp) => {
    if (resp.refreshToken) setCookie('refToken', resp.refreshToken, { path: '/react-burger' });
    return resp;
  });
}
