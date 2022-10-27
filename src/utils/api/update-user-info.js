import checkResponse from "../check-response";
import { baseUrl, userUrl } from "../constants";
import request from "../request";

export default function updateUserInfo (token, userName, email, password) {
  return request(`${baseUrl}${userUrl}`, {
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
  });
}
