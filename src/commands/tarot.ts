import { EmbedBuilder, Message, TextChannel } from "discord.js";
import z from "zod";
import { createCommand } from "../command/createCommand";
import { largeFetch } from "../utils/fetch";
import { int } from "drizzle-orm/mysql-core";
import { getStickAttachmentUrl } from "../deleteMessage";
import { menace, getTimeStamp, setTimeStamp } from "../menacingGent";

export const tarotCmd = createCommand(
  {
    name: "tarot",
    description: "gambling",
    options: {
    },
  },
  async (inter) => {
    //get the username of the user
    const username = inter.user.username;
    //if the username has the word "hunter" in it
    if (menace(username)) {
      let currTime = Date.now();
      let prevtime : number = getTimeStamp();
      setTimeStamp(currTime);
      //if the timestamp is null or the current time is 6 seconds after the last time
      if (currTime - prevtime < 6000) {
        inter.reply("No spamming bozo");
        return;
      }
    }
    const priestess = "https://cdn.discordapp.com/attachments/1144492655020097627/1199587988624117840/AgSkryVl.gif?ex=65c3165f&is=65b0a15f&hm=95cc7ca13440f363325052ee62545660b40287ecff3d9945d20c48869542f1be&";
    const hanged = "https://cdn.discordapp.com/attachments/1144492655020097627/1199592514760482826/zUgRXkNF.gif?ex=65c31a96&is=65b0a596&hm=047146a4b4d36e16b1d5b71de25055c2964e0312aab64111ddce43084ea363d4&";
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
        let flag = true;
        messages.forEach((m) => {
          //if the message is priestess or hanged, don't delete it
          if (flag && (m.content === priestess || m.content === hanged)) {
            flag = false;
          } else {
            m.delete();
          }
        });
      }
    }
  }
);
