import checkResponse from "../check-response";
import { baseUrl, userUrl } from "../constants";

export default function getUserDetails (token) {
  console.log(token);
  return fetch(`${baseUrl}${userUrl}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }).then(checkResponse);
}
