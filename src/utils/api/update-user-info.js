import checkResponse from "../check-response";
import { baseUrl, userUrl } from "../constants";

export default function updateUserInfo (token, userName, email, password) {
  return fetch(`${baseUrl}${userUrl}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      'name': userName,
      'email': email,
      'password': password
    })
  }).then(checkResponse);
}
