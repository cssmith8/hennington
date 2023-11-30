import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import websocket from "@fastify/websocket";
import Fastify, { FastifyRequest } from "fastify";
import { WebAutoMercyDisplay, toggleAutoMercy } from "../commands/automercy";
import { BaseHtml } from "./baseHtml";
import { client } from "..";
import z from "zod";
import { PermissionsBitField } from "discord.js";

const CreateButton = () => (
  <button
    class="rounded p-2 block bg-green-800"
    hx-swap="outerHTML"
    hx-post={"/createrolemenu"}
  >
    + Create Role
  </button>
);

export const fastify = Fastify({
  logger: false,
});

export function updateSite(message: JSX.Element) {
  fastify.websocketServer.clients.forEach((client) => {
    client.send(message.toString());
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

  fastify.post("/roles", async (req, res) => {
    const guild = await client.guilds.fetch("1120455139954786324");
    const roles = guild.roles.cache;
    //for each role
    return (
      <div class="grid grid-cols-4 gap-4">
        {roles.map((role) => (
          <button
            class="bg-slate-700 rounded p-2 block"
            hx-swap="outerHTML"
            hx-post={"/roleinfo/" + role.id}
          >
            {role.name}
          </button>
        ))}
        <CreateButton />
      </div>
    );
  });

  fastify.post("/createrolemenu", async (req, res) => {
    return (
      <form hx-swap="outerHTML" hx-post={"/createrole"}>
        <div>
          Name <input class="text-black" name="rolename" />
        </div>
        <div>
          <input type="checkbox" id="createadmin" name="admin" />
          <label for="createadmin"> Admin</label>
          <br></br>
        </div>
        <button class="bg-slate-700 rounded p-2 block" type="submit">
          Create
        </button>
      </form>
    );
  });

  fastify.post("/createrole", async (req, res) => {
    const schema = z.object({
      admin: z
        .string()
        .optional()
        .transform((x) => x === "on"),
      rolename: z.string(),
    });
    const body = schema.parse(req.body);

    const guild = await client.guilds.fetch("1120455139954786324");

    const role = await guild.roles.create({
      name: body.rolename,
      color: "#909090",
      permissions: body.admin ? [PermissionsBitField.Flags.Administrator] : [],
    });
    const hennington = await guild.roles.fetch("1166542131997966388");

    let perms: boolean = false;
    if (hennington && role) {
      perms = hennington.rawPosition > role.rawPosition;
    }
    return (
      <>
        <div>
          <div>{role?.name}</div>
          <div>{"Id: " + role?.id}</div>
          <div>
            {role?.members.map((user) => (
              <div>{user.displayName}</div>
            ))}
          </div>
          {perms ? (
            <div>
              <form
                hx-post={"/applyrole/" + role.id}
                hx-on:after-request="this.reset()"
              >
                <label>Apply to user id</label>
                <input class="text-black" name="message" />
              </form>
            </div>
          ) : (
            <div>Perms too low to add this role to a user</div>
          )}
        </div>
        <CreateButton />
      </>
    );
  });

  fastify.post(
    "/roleinfo/:roleId",
    async (request: FastifyRequest<{ Params: { roleId: string } }>, reply) => {
      const roleId = request.params["roleId"];
      const guild = await client.guilds.fetch("1120455139954786324");
      //await guild.members.fetch();

      const role = await guild.roles.fetch(roleId);

      const hennington = await guild.roles.fetch("1166542131997966388");

      let perms: boolean = false;
      if (hennington && role) {
        perms = hennington.rawPosition > role.rawPosition;
      }

      return (
        <div>
          <div>{role?.name}</div>
          <div>{"Id: " + role?.id}</div>
          <div>
            {role?.members.map((user) => (
              <div>{user.displayName}</div>
            ))}
          </div>
          {perms ? (
            <div>
              <form
                hx-post={"/applyrole/" + roleId}
                hx-on:after-request="this.reset()"
              >
                <label>Apply to user id</label>
                <input class="text-black" name="message" />
              </form>
            </div>
          ) : (
            <div>Perms too low to add this role to a user</div>
          )}
        </div>
      );
    }
  );

  fastify.post(
    "/applyrole/:roleId",
    async (request: FastifyRequest<{ Params: { roleId: string } }>, reply) => {
      const { message } = request.body as { message: string };
      const roleId = request.params["roleId"];
      const guild = await client.guilds.fetch("1120455139954786324");

      let member = await guild.members.fetch(message);
      member?.roles.add(roleId);

      reply.send(
        <form
          hx-post={"/applyrole/" + roleId}
          hx-on:after-request="this.reset()"
        >
          <label>Apply to user id</label>
          <input class="text-black" name="message" />
        </form>
      );
    }
  );

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
