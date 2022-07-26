import checkResponse from "../check-response";
import { baseUrl, loginUrl } from "../constants";
import request from "../request";
import { setCookie } from "../set-cookie";
import { TLogin } from "../types";

export default function login ({email, password}: TLogin) {
  return request(`${baseUrl}${loginUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  }).then((resp) => {
    if (resp.refreshToken) setCookie('refToken', resp.refreshToken, { path: '/react-burger' });
    return resp;
  });
}
