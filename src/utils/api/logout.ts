import checkResponse from "../check-response";
import { baseUrl, logoutUrl } from "../constants";
import request from "../request";

export default function logout (token: string) {
  return request(`${baseUrl}${logoutUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'token': token
    })
  });
}
