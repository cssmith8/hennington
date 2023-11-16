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
const getOrem = async (): Promise<string> => {
  let orem: string = "";
  const url = "http://bible.oremus.org/?version=NRSVAE&passage=Mark%201.1-2";
  const http = await fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.text();
    })
    .then(function (data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      orem = data; // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });
  if (!orem || orem == "") return "no bible god is fake";
  //remove all text before <h2 class="passageref">
  orem = orem.slice(orem.indexOf('<h2 class="passageref">'));
  //remove all text after </div><!-- class="bibletext" -->
  orem = orem.slice(0, orem.indexOf('</div><!-- class="bibletext" -->'));
  return orem;
};

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

  fastify.get("/", async function (_, reply) {
    // Set html header
    reply.header("Content-Type", "text/html; charset=utf-8");
    return <BaseHtml>{await getOrem()}</BaseHtml>;
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
