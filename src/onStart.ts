import { TextBasedChannel } from "discord.js";
import { client } from ".";

export const onStart = async () => {
  const channels = ["1120455140416172115", "1160065321013620857"];
  //for each channel
  for (const channel of channels) {
    //get the channel
    const c = (await client.channels.fetch(channel)) as TextBasedChannel;
    if (!c) continue;
    //get the last 100 messages
    const messages = await c.messages.fetch({ limit: 10 });
    //for each message
    for (const m of messages) {
      const message = m[1];
      if (message.author.id === client.user?.id) {
        break;
      }
      //if the message contains a mention to yapper bot
      if (message.content.toLowerCase().includes("<@1162597368311582771>")) {
        message.reply(":smiling_imp:");
      }
    }
  }

  let orem: string = "";
  const url = "http://bible.oremus.org/?version=NRSVAE&passage=Mark%201.1-2";
  const http = await fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.text();
    })
    .then(function (data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      orem = data; // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });
  if (!orem || orem == "") return;
  //remove all text before <h2 class="passageref">
  orem = orem.slice(orem.indexOf('<h2 class="passageref">'));

  //remove all text after </div><!-- class="bibletext" -->
  orem = orem.slice(0, orem.indexOf('</div><!-- class="bibletext" -->'));

  //remove all text between < and >
  //orem = orem.replace(/<[^>]*>?/gm, "");

  console.log(orem);

  /*
  const general = (await client.channels.fetch(
    "1120455140416172115"
  )) as TextBasedChannel;
  if (!general) return;
  const options: { limit: number } = { limit: 55 };
  const m = await general.messages.fetch(options);
  for (const message of m) {
    const msg = message[1];
    if (msg.author.id === client.user?.id) {
      let e = new EmbedBuilder();
      e.setDescription(
        '**Yapping Leaderboard**\nPhrase: "' +
          "marcin dumbass" +
          '" ' +
          "\nFrom previous 10000" +
          " messages\n\n" +
          "**1** - hunterthegreat (11)"
      );
      let user = await client.users.fetch("386758028533170177");
      e.setImage(user.displayAvatarURL());
      msg.edit({ embeds: [e] });
    }
  }
  //*/
};
