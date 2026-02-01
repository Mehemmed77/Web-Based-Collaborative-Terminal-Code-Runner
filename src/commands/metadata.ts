import { CLEAR } from "./clear.ts";
import { ECHO } from "./echo.ts";
import { HELP } from "./help.ts";

export type CommandContext = {
  commands: Map<string, Command<any, any>>;
};

export type FuncResult = {
    type: "DICTIONARY" | "CLEAR" | "ERROR" | "OUTPUT_STR",
    output?: string,
    entries?: any[],
    errMsg?: string
}

export type Command<ARGC extends readonly number[], ARGS extends readonly unknown[]> = {
  description: string;
  argc: ARGC;
  execute: (context: CommandContext, ...args: ARGS) => FuncResult;
};

export const COMMANDS = new Map<string, Command<any, any>>([
  ["help", HELP],
  ["echo", ECHO],
  ["clear", CLEAR]
]);
