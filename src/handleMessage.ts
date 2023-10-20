import { ChannelType, Message, TextChannel } from "discord.js";
import { getRandomInt } from "./utils";
import { client } from ".";
import { artwork } from "./artwork";
import { getArtwork } from "./compendium";
import { ashDelete } from "./utils/ashmedai";
import { postData } from "./http";

export default async function handleMessage(message: Message<boolean>) {
  if (message.author.id === client.user?.id) return; // Prevent infinite loops

  if (message.content === "test1123") {
    message.reply("tust1123");
  }

  if (
    message.content.toLowerCase().startsWith("hennington") &&
    message.content.toLowerCase().includes("artwork")
  ) {
    message.channel.send({ embeds: [artwork(getArtwork(0))] });
  }

  if (
    message.content.toLowerCase().startsWith("ashmedai") &&
    message.content.toLowerCase().includes("clear")
  ) {
    ashDelete(message);
  }

  if (message.content.toLowerCase().startsWith("hennington caption this")) {
    //get the rest of the message
    const caption = message.content.slice(24);
    postData(
      "https://discord.com/api/v9/channels/1144492655020097627/messages",
      { content: "$caption " + caption }
    );
  }

  /*
  if (message.author.id == "472069345569144843") {
    let mes = await message.channel.messages.fetch("1165059456443363348");
    console.log(mes.attachments.at(0)?.url);
  }
  //*/

  if (message.reference?.messageId) {
    const repliedTo = await message.channel.messages.fetch(
      message.reference.messageId
    );

    const media = "780570413767983122";
    const henmin = "472069345569144843";
    const hennington = "1162597368311582771";
    const rphennington = "1164630646124195890";
    const general = "1120455140416172115";

    if (repliedTo.author.id === rphennington && message.author.id === media) {
      //attempt for 20 seconds
      for (let i = 0; i < 20; i++) {
        let content = await message.channel.messages
          .fetch(message.id)
          .then((m) => m.content);
        if (
          !content.toLowerCase().startsWith("<a:working:803801825605320754>")
        ) {
          break;
        }
        //wait 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      //repeat message back to general
      const gen = client.channels.cache.get(general);
      if (gen?.type === ChannelType.GuildText) {
        let content = await message.channel.messages
          .fetch(message.id)
          .then((m) => m.content);
        if (
          !content.toLowerCase().startsWith("<a:working:803801825605320754>")
        ) {
          let mes = await message.channel.messages.fetch(message.id);
          if (mes.attachments.at(0)?.url.toString()) {
            (gen as TextChannel).send(
              mes.attachments.at(0)?.url.toString() ?? ""
            );
          }
        }
      }
    }
  }
}
