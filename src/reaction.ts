import {
  Message,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";

export default async function onReaction(
  r: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
) {
  console.log(user.id, r.emoji.name);
  const henmin = "472069345569144843";
  if (user.id != henmin) return;
  console.log("reaction: " + r.emoji.name);
  r.remove();
}
