import checkResponse from "../check-response";
import { baseUrl, registerUrl } from "../constants";

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
    if (resp.refreshToken) document.cookie = `refToken=${resp.refreshToken}`;
    return resp;
  });
}
