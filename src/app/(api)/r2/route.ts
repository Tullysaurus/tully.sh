import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
  async GET(request: Request) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    if (request.method == "GET"){
      const object = await this.env.bucket.get(key, {
        onlyIf: request.headers,
        range: request.headers,
      });

      if (object === null) {
        return new Response("Object Not Found", { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);

      // When no body is present, preconditions have failed
      return new Response("body" in object ? object.body : undefined, {
        status: "body" in object ? 200 : 412,
        headers,
      });
    }
  }
};