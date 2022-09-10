export default function checkResponse (resp) {
  if (resp.ok) {
    return resp.json();
  } else {
    return Promise.reject(`${resp.status}`);
  }
}
