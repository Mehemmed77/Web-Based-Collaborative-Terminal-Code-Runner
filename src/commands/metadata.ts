import { HELP } from "./help.ts";

export type Command<ARGC extends readonly number[], ARGS extends readonly unknown[]> = {
    description: string,
    argc: ARGC,
    execute: (...args: ARGS) => void;
}

export const COMMANDS = {
    "help": HELP
}

