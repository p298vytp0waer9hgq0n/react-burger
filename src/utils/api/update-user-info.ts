import { baseUrl, userUrl } from "../constants";
import request from "../request";
import { TUser } from "../types";

export default function updateUserInfo ({ token, username, email, password }: TUser & { token: string; }) {
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
