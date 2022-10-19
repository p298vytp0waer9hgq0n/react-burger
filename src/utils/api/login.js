import checkResponse from "../check-response";
import { baseUrl, loginUrl } from "../constants";

export default function login ({email, password}) {
  return fetch(`${baseUrl}${loginUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  }).then(checkResponse).then((resp) => {
    if (resp.refreshToken) document.cookie = `refToken=${resp.refreshToken}; path=/react-burger`;
    return resp;
  });
}
