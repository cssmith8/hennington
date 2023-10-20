import { EmbedBuilder } from "discord.js";

export function artwork(url: string) {
  const image = url;

  const embed = new EmbedBuilder().setColor(0x42f2f5).setImage(image);

  return embed;
}
