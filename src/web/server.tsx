import Fastify from "fastify";
import websocket from "@fastify/websocket";
import fastifyFormbody from "@fastify/formbody";

import * as elements from "typed-html";
import { autoMercy, toggleAutoMercy } from "../commands/automercy";

export const fastify = Fastify({
  logger: false,
});

export function updateSite(message: string) {
  fastify.websocketServer.clients.forEach((client) => {
    console.log("sending data");
    client.send(message);
  });
}
// Register websocket plugin

// Create pubsub websocket
const startServer = async () => {
  await fastify.register(websocket);
  await fastify.register(fastifyFormbody);

  fastify.get("/pubsub", { websocket: true }, (connection) => {
    connection.socket.on("open", () => {
      // Send message to all clients
      fastify.websocketServer.clients.forEach((client) => {});
    });

    connection.socket.on("close", () => {
      // Send message to all clients
      fastify.websocketServer.clients.forEach((client) => {});
    });

    connection.socket.on("message", (message) => {
      // Send message to all clients
      console.log(message.toString());
      fastify.websocketServer.clients.forEach((client) => {
        client.send(message);
      });
    });
  });

  fastify.post("/mercytoggle", async (request, reply) => {
    toggleAutoMercy();
    reply.header("Content-Type", "text/html; charset=utf-8");
    return <div id="status">Automercy set to: {autoMercy}</div>;
  });

  fastify.get("/", function (request, reply) {
    // Set html header
    reply.header("Content-Type", "text/html; charset=utf-8");
    reply.send(
      <html>
        <head>
          <title>Test</title>
          <script
            src="https://unpkg.com/htmx.org@1.9.8"
            integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr"
            crossorigin="anonymous"
          ></script>
        </head>
        <body hx-ws="connect:/pubsub">
          <div id="status">Automercy set to: {autoMercy}</div>
          <button
            hx-post="/mercytoggle"
            hx-target="#status"
            hx-swap="outerHTML"
          >
            Toggle mercy status
          </button>
        </body>
      </html>
    );
  });

  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
  });
};

export { startServer };
