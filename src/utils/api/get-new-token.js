import checkResponse from "../check-response";
import { baseUrl, refreshUrl } from "../constants";

export default function getNewToken (token) {
  return fetch(`${baseUrl}${refreshUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'token': token
    })
  }).then(checkResponse).then((resp) => {
    if (resp.refreshToken) document.cookie = `refToken=${resp.refreshToken}`;
    return resp;
  });
}
