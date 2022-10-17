import checkResponse from "../check-response";
import { baseUrl, newPwUrl } from "../constants";

export default function resetPassword ({ password, token }) {
  console.log(password, token);
  return fetch(`${baseUrl}${newPwUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
    .then(checkResponse);
}
