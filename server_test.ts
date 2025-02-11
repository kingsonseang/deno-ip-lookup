import { assertEquals } from "@std/assert";
import { handler } from "./server.ts"; // Import the handler from your main API file

Deno.test("GET / should return an IP address", async () => {
  // Mock request
  const request = new Request("http://localhost:8000", {
    headers: new Headers({
      "x-forwarded-for": "203.0.113.42",
    }),
  });

  // Mock connection info
  const connInfo = {
    remoteAddr: { hostname: "192.168.1.100", transport: "tcp" },
  } as Deno.ServeHandlerInfo;

  // Call the API handler
  const response = await handler(request, connInfo);
  const data = await response.json();

  // Check if the returned IP matches the forwarded header
  assertEquals(data.ip, "203.0.113.42");
});
