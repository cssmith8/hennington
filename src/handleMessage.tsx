import { Message } from "discord.js";
import { client } from ".";
import { artwork } from "./artwork";
import { getArtwork } from "./compendium";
import { ashDelete } from "./utils/ashmedai";
import { updateSite } from "./web/server";

export default async function handleMessage(message: Message<boolean>) {
  const henmin = "472069345569144843";
  if (message.author.id === client.user?.id) return; // Prevent infinite loops

  if (message.content === "test1123") {
    message.reply("tust1123");
  }

  if (
    message.author.id == henmin &&
    message.content.toLowerCase().startsWith("hennington") &&
    message.content.toLowerCase().includes("artwork")
  ) {
    message.channel.send({ embeds: [artwork(getArtwork(0))] });
  }

  if (
    message.author.id == henmin &&
    message.content.toLowerCase().startsWith("ashmedai") &&
    message.content.toLowerCase().includes("clear")
  ) {
    ashDelete(message);
  }
  /*
  if (message.content.toLowerCase().startsWith("hennington caption this")) {
    //get the rest of the message
    const caption = message.content.slice(24);
    postData(
      "https://discord.com/api/v9/channels/1144492655020097627/messages",
      { content: "$caption " + caption }
    );
  }
  //*/

  /*
  if (message.content.toLowerCase().startsWith("hennington caption this")) {
    //get the rest of the message
    const caption = message.content.slice(24);
    postData(
      "https://discord.com/api/v9/channels/1144492655020097627/messages",
      { content: "$caption " + caption }
    );
  }
  //*/

  if (
    message.author.id == henmin &&
    message.content.toLowerCase().includes("12345")
  ) {
    console.log(message.content);
    const priestess = "https://cdn.discordapp.com/attachments/1165065490935316503/1199578638140583997/jzAMAYXs.gif?ex=65c30daa&is=65b098aa&hm=2a6298a92cd4c1f534707ac80285a05df8e743d3da8b35632113974751c0f54c&";
    const hanged = "https://cdn.discordapp.com/attachments/1165065490935316503/1199579389894082580/rJOcOUow.gif?ex=65c30e5d&is=65b0995d&hm=c0d47dbd6c03b7ed2193c305e153cd54a6be39b3b27aa86e231780c6a8aec41c&";
    
  }

  //if the message has an attachment
  if (message.attachments.size > 0) {
    //get the first attachment
    const attachment = message.attachments.first();
    //get the url of the attachment
    const url = attachment?.url;
    //check if the url is a valid url
    if (url) {
      console.log(url);
    }
  }


  /*
  if (message.author.id == "472069345569144843") {
    let mes = await message.channel.messages.fetch("1165059456443363348");
    console.log(mes.attachments.at(0)?.url);
  }
  //*/

  updateSite(
    <div id="messages" hx-swap-oob="beforeend">
      <div class="border border-gray-500 my-3 p-2">
        <div>{message.author.displayName}</div>
        <div>{message.content}</div>
      </div>
    </div>
  );

  const collectorFilter = (
    reaction: { emoji: { name: string } },
    user: { id: string }
  ) => {
    return user.id === message.author.id;
  };

  const collector = message.createReactionCollector({
    //@ts-ignore
    //filter: collectorFilter,
    time: 15000,
  });

  collector.on("collect", (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  });

  collector.on("end", (collected) => {
    //console.log(`Collected ${collected.size} items`);
  });
}
