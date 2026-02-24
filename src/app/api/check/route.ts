import { getPrisma } from "@/lib/prisma";

export async function fetch(request: Request, env: any) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key') || "";

    const prisma = getPrisma(env)

    const keyFound = await prisma.key.findUnique({
        where: {
            key: key,
        },
    });


    if (!key) {
        return new Response(JSON.stringify({ error: 'Missing key parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        if (keyFound) {
            return new Response(JSON.stringify({ success: true, key }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ success: false, key }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
