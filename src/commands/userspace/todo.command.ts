import { DMChannel, Message, NewsChannel, TextChannel } from "discord.js";
import { createTodoList } from "../../todo/todo.methods";
import {
  TodoEntry,
  TodoEntrySchema,
  TodoList,
  todoListModel,
} from "../../todo/todo.models";
import { sendMessage } from "../../util/message";
import { Command, CommandLength } from "../frame/command";
import { InvalidCommandParamError } from "../frame/command.exception";

export class CreateCommand implements Command {
  public name: string = "create";

  public length: CommandLength = {
    min: 1,
  };

  public handle: (message: Message, args: string[]) => Promise<void> = async (
    message: Message,
    args: string[]
  ): Promise<void> => {
    const channel: TextChannel | DMChannel | NewsChannel = message.channel;

    if (!(channel instanceof TextChannel)) {
      throw new InvalidCommandParamError(
        "Todo lists can only be created in text channels."
      );
    }

    const name: string = args.reduce((n, a) => n.concat(" ").concat(a));

    const todoList: TodoList = await createTodoList(name, channel);

    sendMessage(channel, `Created todo list ${name} in ${channel.name}.`);
  };
}

export class AddCommand implements Command {
  public name: string = "add";
  public length: CommandLength = {
    min: 2,
  };

  public handle: (message: Message, args: string[]) => Promise<void> = async (
    message: Message,
    args: string[]
  ): Promise<void> => {
    const listName: string = args.shift() as string;

    const list: TodoList = await todoListModel.find({ name: listName });

    const entryName: string = args.shift() as string;

    const text: string = args.reduce((n, a) => n.concat(" ").concat(a));

    const entry: TodoEntry = new TodoEntry(entryName, text, 0);
  };
}
