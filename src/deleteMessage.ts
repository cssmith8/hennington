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

let deletedAttachmentUrl: string | null = null;

export const deleteMessage = async (
  message: Message<boolean> | PartialMessage
) => {
  if (message.content && message.content.length > 0) {
    console.log(
      "sticking: " + message.author?.username + ": " + message.content
    );
    deletedMessage = message as Message;
    //if the message has an attachment, save the url
    
  }
  if (message.attachments.size > 0) {
    deletedAttachmentUrl = message.attachments.first()?.url as string;
  }
  if (getAutoMercy()) {
    revive(message.channel as TextChannel);
  }
};

export const getStickMessage = () => {
  return deletedMessage;
};

export const getStickAttachmentUrl = () => {
  return deletedAttachmentUrl;
};