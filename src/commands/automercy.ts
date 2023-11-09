import z from "zod";
import { createCommand } from "../command/createCommand";
import { getStickMessage } from "../deleteMessage";
import { Message, PartialMessage } from "discord.js";

let autoMercy: boolean = false;

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
    if (inter.input.setting != null) {
      autoMercy = inter.input.setting;
      inter.reply("autoMercy set to " + autoMercy);
    } else {
      inter.reply("autoMercy is " + autoMercy);
    }
  }
);

export const getAutoMercy = () => {
  return autoMercy;
};
