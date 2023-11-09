import { Message } from "discord.js";

export default async function editMessage(oldMessage: any, message: any) {
  const henmin = "472069345569144843";
  if (message.author.id != henmin) return;
  console.log("edit message: " + message.content);
}
