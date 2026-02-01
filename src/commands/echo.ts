import { Command, CommandContext, FuncResult } from "./metadata.ts";

type EchoArgs = string[];

export const ECHO = {
    description: "display a string to the standard output",
    argc: [1],
    execute: echoFunc

} satisfies Command<readonly number[], EchoArgs>

export default function echoFunc(context: CommandContext, ...args: string[]): FuncResult {
    const resultantString = args.join(" ");
    return {
        type: "OUTPUT_STR",
        output: resultantString
    }
}
