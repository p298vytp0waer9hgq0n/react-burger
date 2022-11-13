import checkResponse from "../check-response";
import { baseUrl, registerUrl } from "../constants";
import request from "../request";
import { setCookie } from "../set-cookie";
import { TRegister } from "../types";

export default function register ({ username, email, password }: TRegister) {
  return request(`${baseUrl}${registerUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "name": username,
      "email": email,
      "password": password
    })
  }).then((resp) => {
    if (resp.refreshToken) setCookie('refToken', resp.refreshToken, { path: '/react-burger' });
    return resp;
  });
}
