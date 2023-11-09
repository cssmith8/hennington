import * as elements from "typed-html";
import z from "zod";
import { createCommand } from "../command/createCommand";
import { updateSite } from "../web/server";

export let autoMercy: boolean = false;

export const toggleAutoMercy = () => {
  autoMercy = !autoMercy;
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
    if (inter.input.setting != null) {
      autoMercy = inter.input.setting;
      inter.reply("autoMercy set to " + autoMercy);
    } else {
      inter.reply("autoMercy is " + autoMercy);
    }
    updateSite(<div id="status">Automercy set to: {autoMercy}</div>);
  }
);

export const getAutoMercy = () => {
  return autoMercy;
};
