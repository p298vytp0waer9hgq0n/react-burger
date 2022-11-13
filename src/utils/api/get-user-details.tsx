import checkResponse from "../check-response";
import { baseUrl, userUrl } from "../constants";
import request from "../request";

export default function getUserDetails (token: string) {
  return request(`${baseUrl}${userUrl}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  });
}
