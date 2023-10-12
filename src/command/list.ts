import { Command, OptionCommand } from ".";
import { ashmedaiCmd } from "../commands/ashmedai";
import { fortniteStatsCmd } from "../commands/fortniteStats";
import { testCommand, testGroup } from "../commands/testCommand";

export const commandsList: Command<any>[] = [
  testCommand,
  fortniteStatsCmd,
  // addCommandCommand,
  ashmedaiCmd,
  testGroup,
];

export const addCommand = <T>(command: OptionCommand<T>) => {
  commandsList.push(command);
};
