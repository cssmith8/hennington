import z from "zod";
import { ashDelete } from "../utils/ashmedai";
import { createCommand } from "../command/createCommand";
import { menace, getTimeStamp, setTimeStamp } from "../menacingGent";

export const ashmedaiCmd = createCommand(
  {
    name: "ash",
    description: "clears all sus imagery from your screen",
    options: {
      max: {
        description: "number of safe messages to display",
        type: z.number().min(1).max(30).optional(),
      },
    },
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
    ashDelete(inter, inter.input.max);
  }
);
