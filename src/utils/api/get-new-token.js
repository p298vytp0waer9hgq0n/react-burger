import checkResponse from "../check-response";
import { baseUrl, refreshUrl } from "../constants";
import { setCookie } from "../set-cookie";

export default function getNewToken (token) {
  return fetch(`${baseUrl}${refreshUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'token': token
    })
  }).then(checkResponse).then((resp) => {
    if (resp.refreshToken) setCookie('refToken', resp.refreshToken, { path: '/react-burger' });
    return resp;
  });
}
