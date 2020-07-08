import { HttpRequest } from "@azure/functions";

export function getMockRequest(request?: Partial<HttpRequest>): HttpRequest {
  return {
    headers: {},
    method: "GET",
    params: {},
    query: {},
    url: "",
    ...request,
  };
}
