import { Command, OptionCommand } from ".";
import { ashmedaiCmd } from "../commands/ashmedai";
import { autoMercyCmd } from "../commands/automercy";
import { mercyCmd } from "../commands/mercy";
import { tarotCmd } from "../commands/tarot";
import { yapCmd } from "../commands/yap";

export const commandsList: Command<any>[] = [
  // addCommandCommand,
  ashmedaiCmd,
  yapCmd,
  mercyCmd,
  autoMercyCmd,
  tarotCmd
];

export const addCommand = <T>(command: OptionCommand<T>) => {
  commandsList.push(command);
};
