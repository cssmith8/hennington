import {
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Interaction,
  Message,
  TextChannel,
} from "discord.js";

export async function largeFetch(
  channel: TextChannel,
  limit: number,
  inter: ChatInputCommandInteraction
) {
  const sum_messages = [];
  let last_id;

  while (true) {
    let messages;
    if (last_id) {
      const options: { limit: number; before: string } = {
        limit:
          limit - sum_messages.length >= 100
            ? 100
            : limit - sum_messages.length,
        before: last_id,
      };
      messages = await channel.messages.fetch(options);
    } else {
      const options: { limit: number } = { limit: 100 };
      messages = await channel.messages.fetch(options);
    }

    inter.editReply({
      embeds: [
        new EmbedBuilder().setDescription(
          "Searching " +
            limit +
            " messages... (" +
            (100 * sum_messages.length) / limit +
            "%)"
        ),
      ],
    });

    sum_messages.push(...Array.from(messages.values()));
    last_id = messages.last()?.id;
    /*
    console.log("---");
    console.log("sum messages size: " + sum_messages.length);
    console.log("messages size: " + messages.size);
    console.log("last id: " + last_id);
    //*/

    if (messages.size != 100 || sum_messages.length >= limit) {
      break;
    }
  }
  return sum_messages;
}
