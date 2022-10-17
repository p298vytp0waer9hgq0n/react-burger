import checkResponse from "../check-response";
import { baseUrl, resetUrl } from "../constants";

export default function requestPwReset (email) {
  return fetch(`${baseUrl}${resetUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email
    })
  })
    .then(checkResponse);
}
