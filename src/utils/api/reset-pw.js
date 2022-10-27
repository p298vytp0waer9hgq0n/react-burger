import checkResponse from "../check-response";
import { baseUrl, newPwUrl } from "../constants";
import request from "../request";

export default function resetPassword ({ password, token }) {
  return request(`${baseUrl}${newPwUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  });
}
