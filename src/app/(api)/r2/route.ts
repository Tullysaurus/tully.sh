import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return new Response("Missing file key", { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bucket = (globalThis as any).env?.MY_BUCKET;

    if (!bucket) {
      console.error("MY_BUCKET binding missing");
      return new Response("Server misconfigured", { status: 500 });
    }


    // ✅ SAFE access without breaking Next types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const object = await bucket.get(key) // ?? await (globalThis as any).env?.bucket?.get(key);

    if (!object) {
      return new Response("File not found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);

    return new Response(object.body, {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}