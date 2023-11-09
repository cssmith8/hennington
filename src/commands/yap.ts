import z from "zod";
import { createCommand } from "../command/createCommand";
import { EmbedBuilder, Message, TextChannel } from "discord.js";
import { client } from "../index";
import { largeFetch } from "../utils/fetch";

export const yapCmd = createCommand(
  {
    name: "yap",
    description: "shows who be wafflin the most",
    options: {
      phrase: {
        description: "phrase to search for",
        type: z.string(),
      },
      size: {
        description:
          "number of messages to search, [1<=x<=10000] default: 1000",
        type: z.number().min(1).max(10000).optional(),
      },
    },
  },
  async (inter) => {
    let phrase = inter.input.phrase.toLowerCase();
    let users: string[] = [];
    let times: number[] = [];

    let activeChannel = inter.channel as TextChannel;

    let messages: Message[];
    inter.reply({
      embeds: [new EmbedBuilder().setDescription("Searching messages...")],
    });
    //wait 0.2 seconds
    await new Promise((r) => setTimeout(r, 1000));
    if (!inter.input.size || (inter.input.size && inter.input.size > 100)) {
      console.log("beginning large fetch: " + (inter.input.size ?? "1000"));
      messages = await largeFetch(
        activeChannel,
        inter.input.size || 1000,
        inter
      );
      console.log("large fetch complete");
    } else {
      const m = await activeChannel.messages.fetch({
        limit: inter.input.size || 100,
      });
      //create array of the second element of each message
      messages = Array.from(m?.values() || []).map((m) => m);
    }

    for (const m of messages || []) {
      //const m = mes[1];
      if (typeof m === "string") continue;
      if (m.content && m.content.toLowerCase().includes(phrase)) {
        let user: string = m.author.id || "";
        let index = users.indexOf(user);
        if (index === -1) {
          users.push(user);
          times.push(1);
        } else {
          times[index]++;
        }
      }
    }

    //sort users by times
    let sortedUsers = [...users];
    let sortedTimes = [...times];
    sortedTimes.sort((a, b) => b - a);
    sortedUsers.sort((a, b) => {
      let indexA = users.indexOf(a);
      let indexB = users.indexOf(b);
      return times[indexB] - times[indexA];
    });

    let leaderboard: string[] = [];
    for (let i = 0; i < sortedUsers.length && i < 5; i++) {
      let user = await inter.client.users.fetch(sortedUsers[i]);
      leaderboard.push(`${user.username} (${sortedTimes[i]})`);
    }

    let leaderboardString = "";
    for (let i = 0; i < leaderboard.length; i++) {
      leaderboardString += `**${i + 1}** - ${leaderboard[i]}\n`;
    }
    if (users.length > 5) leaderboardString += `...\n`;

    let e = new EmbedBuilder();
    if (leaderboard.length > 0) {
      let user = await inter.client.users.fetch(sortedUsers[0]);
      e.setImage(user.displayAvatarURL());
    } else {
      leaderboardString = "No yaps sighted";
    }

    e.setDescription(
      '**Yapping Leaderboard**\nPhrase: "' +
        inter.input.phrase +
        '" ' +
        (inter.input.phrase == phrase ? "" : "(" + phrase + ")") +
        "\nFrom previous " +
        messages.length +
        " messages\n\n" +
        leaderboardString
    );
    inter.editReply({ embeds: [e] });
  }
);
