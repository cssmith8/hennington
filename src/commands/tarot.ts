import { EmbedBuilder, Message, TextChannel } from "discord.js";
import z from "zod";
import { createCommand } from "../command/createCommand";
import { largeFetch } from "../utils/fetch";
import { int } from "drizzle-orm/mysql-core";
import { getStickAttachmentUrl } from "../deleteMessage";

export const tarotCmd = createCommand(
  {
    name: "tarot",
    description: "gambling",
    options: {
    },
  },
  async (inter) => {
    const priestess = "https://cdn.discordapp.com/attachments/1165065490935316503/1199585194533986395/IcEPQLwa.gif?ex=65c313c5&is=65b09ec5&hm=a6b402756e01c972910d2bf0bce16eca46d0101deabef9c1d7de8a740e4d8977&";
    const hanged = "https://cdn.discordapp.com/attachments/1165065490935316503/1199579389894082580/rJOcOUow.gif?ex=65c30e5d&is=65b0995d&hm=c0d47dbd6c03b7ed2193c305e153cd54a6be39b3b27aa86e231780c6a8aec41c&";
    const succeed = Math.random() < 0.5;

    if (succeed) {
      inter.reply(priestess);
    } else {
      inter.reply(hanged);
    }

    //wait 4 seconds
    
    await new Promise((r) => setTimeout(r, 5000));

    if (succeed) {
      const url = getStickAttachmentUrl();
      if (url) {
        inter.channel?.send(url);
      } else {
        inter.channel?.send("no image found");
      }
    } else {
      //delete 15 messages in the inter channel
      const messages = await inter.channel?.messages.fetch({ limit: 15 });
      if (messages) {
      
        messages.forEach((m) => {
          //if the message is priestess or hanged, don't delete it
          if (m.content === priestess || m.content === hanged) {
            
          } else {
            m.delete();
          }
        });
      }
    }
  }
);
