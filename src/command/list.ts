import { Command, OptionCommand } from ".";
import { ashmedaiCmd } from "../commands/ashmedai";

export const commandsList: Command<any>[] = [
  // addCommandCommand,
  ashmedaiCmd,
];

export const addCommand = <T>(command: OptionCommand<T>) => {
  commandsList.push(command);
};
