import { Command } from "./metadata.ts";

type HelpArgs = [] | string[]

export const HELP = {
    description: "Displays a brief summary and list of all available built-in shell commands.",
    argc: [0, 1],
    execute: helpFunc

} satisfies Command<readonly number[], HelpArgs>

export default function helpFunc(...helpFor: HelpArgs) {

}

helpFunc([]);

