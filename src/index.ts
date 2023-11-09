import { Client, Events, GatewayIntentBits } from "discord.js";
require("dotenv/config"); // Load environment variables
import handleMessage from "./handleMessage";
import { handleCommand } from "./command/handler";
import editMessage from "./editMessage";
import onReaction from "./reaction";
import { onStart } from "./onStart";
import { deleteMessage } from "./deleteMessage";
import { startServer } from "./web/server";
console.log(process.env.TOKEN);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  onStart();
});

client.on(Events.MessageCreate, (message) => {
  handleMessage(message);
});

client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
  editMessage(oldMessage, newMessage);
});

//on message delete
client.on(Events.MessageDelete, (message) => {
  deleteMessage(message);
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  console.log("reaction detected");
  onReaction(reaction, user);
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.isChatInputCommand()) {
    handleCommand(interaction);
  }
});

const token = process.env.TOKEN;

if (!token) {
  console.error("No token provided!");
  process.exit(1);
}

client.login(token);
startServer();

export { client };
