import checkResponse from "../check-response";
import { baseUrl, userUrl } from "../constants";

export default function updateUserInfo (token, userName, email) {
  return fetch(`${baseUrl}${userUrl}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorisation': token
    },
    body: JSON.stringify({
      'name': userName,
      'email': email
    })
  }).then(checkResponse);
}
