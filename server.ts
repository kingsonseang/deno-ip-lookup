export function handler(req: Request, connInfo: Deno.ServeHandlerInfo) {
  const forwardedIP = req.headers.get("x-forwarded-for");
  const cfIP = req.headers.get("cf-connecting-ip");
  const realIP = req.headers.get("x-real-ip");

  const { hostname } = connInfo.remoteAddr as Deno.NetAddr;
  const clientIP = forwardedIP || cfIP || realIP || hostname || "Unknown";

  return new Response(JSON.stringify({ ip: clientIP }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Allows all origins (no CORS block)
      "Access-Control-Allow-Methods": "GET, OPTIONS", // Supports GET and preflight OPTIONS
      "Access-Control-Allow-Headers": "*", // Allows any headers
    },
  });
}

Deno.serve(handler);
