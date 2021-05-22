import { Message } from "discord.js";

export interface CommandLength {
  min?: number;
  max?: number;
}

export interface Command {
  name: string;
  handle: (message: Message, args: string[]) => Promise<void>;

  length?: CommandLength;
}

export class BaseCommand implements Command {
  constructor(
    public name: string,
    public handle: (message: Message, args: string[]) => Promise<void>,

    public length?: CommandLength
  ) {}
}
