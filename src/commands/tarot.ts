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
    const priestess = "https://cdn.discordapp.com/attachments/1144492655020097627/1199587988624117840/AgSkryVl.gif?ex=65c3165f&is=65b0a15f&hm=95cc7ca13440f363325052ee62545660b40287ecff3d9945d20c48869542f1be&";
    const hanged = "https://cdn.discordapp.com/attachments/1144492655020097627/1199588133986119730/cFqRRNjy.gif?ex=65c31682&is=65b0a182&hm=1ab372e2d647354f3b9ebec9e1a0cf6638493e064e7975b108419d7294f27421&";
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
      //delete 10 messages in the inter channel
      const messages = await inter.channel?.messages.fetch({ limit: 10 });
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
