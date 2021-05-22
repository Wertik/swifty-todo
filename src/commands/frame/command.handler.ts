import { Message } from "discord.js";
import { sendMessage } from "../../util/message";
import { Command } from "./command";
import {
  CommandAlreadyRegisteredError,
  NotEnoughArgsError,
  TooManyArgsError,
} from "./command.exception";

export class CommandHandler {
  private commands: Command[] = [];

  public getCommands = () => {
    return this.commands;
  };

  public addCommand = (cmd: Command) => {
    if (this.commands.find((c) => cmd.name === c.name)) {
      throw new CommandAlreadyRegisteredError(
        `Command ${cmd.name} already registered.`
      );
    }

    this.commands.push(cmd);
    console.log(`Registered command ${cmd.name}`);
  };

  public handleMessage = (message: Message) => {
    const content: string = message.content.substring(
      (process.env.PREFIX ?? "-").length
    );

    const args: string[] = content.split(" ");
    const commandName: string = args.shift() as string;

    const command: Command | undefined = this.commands.find(
      ({ name }) => name === commandName
    );

    if (!command) {
      sendMessage(message.channel, "Invalid command!");
      return;
    }

    if (command.length) {
      if (command.length.min && args.length < command.length.min) {
        throw new NotEnoughArgsError();
      }

      if (command.length.max && args.length > command.length.max) {
        throw new TooManyArgsError();
      }
    }

    try {
      command.handle(message, args)?.catch((error) => {
        sendMessage(message.channel, `An error occured: ${error.message}`);
      });
    } catch (error) {
      sendMessage(message.channel, `An error occured: ${error.message}`);
    }
  };
}
