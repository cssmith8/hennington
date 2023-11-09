import {
  EmbedBuilder,
  Message,
  PartialMessage,
  TextBasedChannel,
  TextChannel,
} from "discord.js";
import { client } from ".";
import { getAutoMercy } from "./commands/automercy";
import { revive } from "./utils/revive";

let deletedMessage: Message | null = null;

export const deleteMessage = async (
  message: Message<boolean> | PartialMessage
) => {
  if (message.content && message.content.length > 0) {
    console.log(
      "sticking: " + message.author?.username + ": " + message.content
    );
    deletedMessage = message as Message;
  }
  if (getAutoMercy()) {
    revive(message.channel as TextChannel);
  }
};

export const getStickMessage = () => {
  return deletedMessage;
};
