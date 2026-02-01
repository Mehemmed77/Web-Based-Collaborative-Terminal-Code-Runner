import { Command, CommandContext, FuncResult } from "./metadata.ts";

type ClearArgs = [];

export const CLEAR = {
    description: "Utility that erases all visible output from the terminal screen",
    argc: [0],
    execute: clearFunc
} satisfies Command<readonly number[], ClearArgs>

export default function clearFunc(context: CommandContext, ...args: ClearArgs): FuncResult {
    return {
        type: "CLEAR"
    }
}
