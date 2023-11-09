import {
  ChatInputCommandInteraction,
  Message,
  TextBasedChannel,
  TextChannel,
} from "discord.js";
import { getStickMessage } from "../deleteMessage";

export const revive = async (
  inter: ChatInputCommandInteraction | TextChannel
) => {
  const message = getStickMessage();
  let channel: TextBasedChannel | null;
  if (inter instanceof TextChannel) {
    channel = inter;
  } else {
    channel = inter.channel;
  }
  if (channel == null) {
    return;
  }

  //const interaction: boolean = inter instanceof ChatInputCommandInteraction;

  if (message != null) {
    if (message instanceof Message) {
      if (inter instanceof ChatInputCommandInteraction) {
        inter.reply({
          content:
            "https://tenor.com/view/mercy-overwatch-come-here-gif-14280244",
        });
        await new Promise((r) => setTimeout(r, 200));
      }
      const m = "<@" + message.author.id + ">: " + message.content;
      if (m.length >= 2000) {
        channel.send(message.content);
      } else {
        channel.send(m);
      }
    }
    //wait 0.2 seconds
  } else {
    if (inter instanceof ChatInputCommandInteraction) {
      inter.reply("nothing found");
    }
  }
};
