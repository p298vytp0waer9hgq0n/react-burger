import checkResponse from "../check-response";
import { baseUrl, resetUrl } from "../constants";
import request from "../request";

export default function requestPwReset (email: string) {
  return request(`${baseUrl}${resetUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email
    })
  });
}
