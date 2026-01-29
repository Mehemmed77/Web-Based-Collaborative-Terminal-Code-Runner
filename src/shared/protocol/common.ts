type Command<ARGC extends readonly number[]> = {
    description: string,
    argc: ARGC
}

export const COMMANDS = {
    "help": {
        description: "show help",
        argc: [0, 1]
    }
} satisfies Record<string, Command<readonly number[]>>;

