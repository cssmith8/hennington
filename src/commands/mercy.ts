import z from "zod";
import { ashDelete } from "../utils/ashmedai";
import { createCommand } from "../command/createCommand";
import { getStickMessage } from "../deleteMessage";
import { Message, PartialMessage } from "discord.js";
import { revive } from "../utils/revive";

export const mercyCmd = createCommand(
  {
    name: "mercy",
    description: "brings back the most recent deleted message from the grave",
    options: {},
  },
  async (inter) => {
    revive(inter);
  }
);
