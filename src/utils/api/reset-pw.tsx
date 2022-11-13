import checkResponse from "../check-response";
import { baseUrl, newPwUrl } from "../constants";
import request from "../request";
import { TReset } from "../types";

export default function resetPassword ({ password, token }: TReset) {
  return request(`${baseUrl}${newPwUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  });
}
