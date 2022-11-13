import { baseUrl, userUrl } from "../constants";
import request from "../request";

export default function updateUserInfo (token: string, username: string, email: string, password: string) {
  return request(`${baseUrl}${userUrl}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      'name': username,
      'email': email,
      'password': password
    })
  });
}
