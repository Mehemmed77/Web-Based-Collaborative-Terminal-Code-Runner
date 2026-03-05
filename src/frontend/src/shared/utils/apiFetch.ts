export default async function apiFetch(
  link: string,
  method: "GET" | "POST" | "PUT",
  data?: any,
  auth = false,
) {
  const options: RequestInit = {
    method: method,
  };

  const headers: HeadersInit = auth
    ? {}
    : {
        "x-session-id": sessionStorage.getItem("sessionId")!,
      };

  if (data) headers["Content-Type"] = "application/json";
  if (data) options["body"] = JSON.stringify(data);

  options["headers"] = headers;

  const response = await fetch(link, options);

  return response;
}
