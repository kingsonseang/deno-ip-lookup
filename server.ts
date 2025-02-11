Deno.serve((req, connInfo) => {
  // Get IP from headers (useful for proxies, Cloudflare, etc.)
  const forwardedIP = req.headers.get("x-forwarded-for");
  const cfIP = req.headers.get("cf-connecting-ip"); // Cloudflare
  const realIP = req.headers.get("x-real-ip");

  // Get direct client IP from connection (Works on local & server)
  const { hostname } = connInfo.remoteAddr as Deno.NetAddr;

  // Determine best IP source
  const clientIP = forwardedIP || cfIP || realIP || hostname || "Unknown";

  console.log("Client IP:", clientIP);

  return new Response(JSON.stringify({ ip: clientIP }), {
    headers: { "Content-Type": "application/json" },
  });
});
