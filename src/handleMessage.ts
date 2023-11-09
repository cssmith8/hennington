import { ChannelType, Message, TextChannel } from "discord.js";
import { getRandomInt } from "./utils";
import { client } from ".";
import { artwork } from "./artwork";
import { getArtwork } from "./compendium";
import { ashDelete } from "./utils/ashmedai";
import { postData } from "./http";

export default async function handleMessage(message: Message<boolean>) {
  const henmin = "472069345569144843";
  if (message.author.id === client.user?.id) return; // Prevent infinite loops

  if (message.content === "test1123") {
    message.reply("tust1123");
  }

  if (
    message.author.id == henmin &&
    message.content.toLowerCase().startsWith("hennington") &&
    message.content.toLowerCase().includes("artwork")
  ) {
    message.channel.send({ embeds: [artwork(getArtwork(0))] });
  }

  if (
    message.author.id == henmin &&
    message.content.toLowerCase().startsWith("ashmedai") &&
    message.content.toLowerCase().includes("clear")
  ) {
    ashDelete(message);
  }
  /*
  if (message.content.toLowerCase().startsWith("hennington caption this")) {
    //get the rest of the message
    const caption = message.content.slice(24);
    postData(
      "https://discord.com/api/v9/channels/1144492655020097627/messages",
      { content: "$caption " + caption }
    );
  }
  //*/

  /*
  if (message.content.toLowerCase().startsWith("hennington caption this")) {
    //get the rest of the message
    const caption = message.content.slice(24);
    postData(
      "https://discord.com/api/v9/channels/1144492655020097627/messages",
      { content: "$caption " + caption }
    );
  }
  //*/

  if (
    message.author.id == henmin &&
    message.content.toLowerCase().includes("12345")
  ) {
    console.log(message.content);
  }

  /*
  if (message.author.id == "472069345569144843") {
    let mes = await message.channel.messages.fetch("1165059456443363348");
    console.log(mes.attachments.at(0)?.url);
  }
  //*/

  const collectorFilter = (
    reaction: { emoji: { name: string } },
    user: { id: string }
  ) => {
    return user.id === message.author.id;
  };

  const collector = message.createReactionCollector({
    //@ts-ignore
    //filter: collectorFilter,
    time: 15000,
  });

  collector.on("collect", (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  });

  collector.on("end", (collected) => {
    //console.log(`Collected ${collected.size} items`);
  });
}
