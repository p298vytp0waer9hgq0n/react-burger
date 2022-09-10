import checkResponse from "./check-response";

export default function fetchData (url:string): Promise<any> {
  return fetch(url)
    .then(checkResponse);
}
