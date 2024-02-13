import z from "zod";
import { createCommand } from "../command/createCommand";
import { updateSite } from "../web/server";
import { menace, getTimeStamp, setTimeStamp } from "../menacingGent";

export let autoMercy: boolean = false;

export const toggleAutoMercy = () => {
  autoMercy = !autoMercy;
};

export const WebAutoMercyDisplay = () => {
  return (
    <div id="status" class={autoMercy ? "text-green-500" : "text-red-500"}>
      Automercy: {autoMercy ? "ON" : "OFF"}
    </div>
  );
};

export const autoMercyCmd = createCommand(
  {
    name: "automercy",
    description:
      "automatically brings back the any deleted messages from the grave",
    options: {
      setting: {
        description: "True = on, False = off",
        type: z.boolean().optional(),
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
    if (inter.input.setting != null) {
      autoMercy = inter.input.setting;
      inter.reply("autoMercy set to " + autoMercy);
    } else {
      inter.reply("autoMercy is " + autoMercy);
    }
    updateSite(<WebAutoMercyDisplay />);
  }
);

export const getAutoMercy = () => {
  return autoMercy;
};
