import { Command, CommandContext, FuncResult } from "./metadata.ts";

type HelpArgs = [] | [string];

export const HELP = {
  description: "Displays a brief summary and list of all available built-in shell commands.",
  argc: [0, 1],
  execute: helpFunc,
} satisfies Command<readonly number[], HelpArgs>;

export type HelpEntry = {
  commandName: string;
  commandDescription: string;
};

export default function helpFunc(context: CommandContext, ...helpFor: HelpArgs): FuncResult {
  const entries: HelpEntry[] = [];
  if (helpFor.length === 0) {
    for (const [key, value] of context.commands.entries()) {
      entries.push({
        commandName: key,
        commandDescription: value.description,
      });
    }

    return {
        type: "DICTIONARY",
        entries: entries
    }
  }

  const commandName = helpFor[0];
  const commandMeta = context.commands.get(commandName);

  if (commandMeta == null) {
    return {
        type: "ERROR",
        errMsg: "Command not found"
    }
  };

  entries.push({
    commandName: commandName,
    commandDescription: commandMeta.description
  })

  return {
    type: "DICTIONARY",
    entries: entries,
  }
}
