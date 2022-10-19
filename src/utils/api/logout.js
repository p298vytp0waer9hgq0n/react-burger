import checkResponse from "../check-response";
import { baseUrl, logoutUrl } from "../constants";

export default function logout (token) {
  return fetch(`${baseUrl}${logoutUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'token': token
    })
  }).then(checkResponse);
}
