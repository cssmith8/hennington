import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import websocket from "@fastify/websocket";
import Fastify from "fastify";
import * as elements from "typed-html";
import { WebAutoMercyDisplay, toggleAutoMercy } from "../commands/automercy";
import { BaseHtml } from "./baseHtml";

export const fastify = Fastify({
  logger: false,
});

export function updateSite(message: string) {
  fastify.websocketServer.clients.forEach((client) => {
    client.send(message);
  });
}
// Register websocket plugin

// Create pubsub websocket
const startServer = async () => {
  await fastify.register(websocket);
  await fastify.register(fastifyFormbody);
  // Static files
  console.log(process.cwd());
  fastify.register(fastifyStatic, {
    root: process.cwd() + "/public",
    prefix: "/public/",
  });

  fastify.get("/pubsub", { websocket: true }, (_connection) => {});

  fastify.post("/mercytoggle", async (_request, reply) => {
    toggleAutoMercy();
    reply.header("Content-Type", "text/html; charset=utf-8");
    return <WebAutoMercyDisplay />;
  });

  fastify.get("/", function (_, reply) {
    // Set html header
    reply.header("Content-Type", "text/html; charset=utf-8");
    return (
      <BaseHtml>
        <WebAutoMercyDisplay />
        <button
          class="bg-slate-700 rounded p-2"
          hx-post="/mercytoggle"
          hx-target="#status"
          hx-swap="outerHTML"
        >
          Toggle mercy status
        </button>
      </BaseHtml>
    );
  });

  fastify.listen({ port: 3000 }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
  });
};

export { startServer };
