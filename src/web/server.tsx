import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import websocket from "@fastify/websocket";
import Fastify from "fastify";
import * as elements from "typed-html";
import { WebAutoMercyDisplay, toggleAutoMercy } from "../commands/automercy";
import { BaseHtml } from "./baseHtml";
import { client } from "..";

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
    updateSite(<WebAutoMercyDisplay />); // Update other people viewing the site
    return <WebAutoMercyDisplay />;
  });

  fastify.post("/send", async (req, res) => {
    const { message } = req.body as { message: string };
    client.channels.fetch("1120455140416172115").then((c) => {
      if (c?.isTextBased()) {
        c.send(message);
      }
    });

    res.send(
      <form hx-post="/send" hx-on:after-request="this.reset()">
        <label>Send a message</label>
        <input class="text-black" name="message" />
      </form>
    );
  });

  fastify.get("/", function (_, reply) {
    // Set html header
    reply.header("Content-Type", "text/html; charset=utf-8");
    return <BaseHtml />;
  });

  fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${fastify.server.address()?.toString()}`);
  });
};

export { startServer };
