import z from "zod";
import { ashDelete } from "../utils/ashmedai";
import { createCommand } from "../command/createCommand";
import { getStickMessage } from "../deleteMessage";
import { Message, PartialMessage } from "discord.js";
import { revive } from "../utils/revive";
import { menace, getTimeStamp, setTimeStamp } from "../menacingGent";

export const mercyCmd = createCommand(
  {
    name: "mercy",
    description: "brings back the most recent deleted message from the grave",
    options: {},
  },
  async (inter) => {
    //get the username of the user
    const username = inter.user.username;
    //if the username has the word "hunter" in it
    if (menace(username)) {
      let currTime = Date.now();
      let prevtime : number = getTimeStamp();
      setTimeStamp(currTime);
      //if the timestamp is null or the current time is 6 seconds after the last time
      if (currTime - prevtime < 6000) {
        inter.reply("No spamming bozo");
        return;
      }
    }
    revive(inter);
  }
);
