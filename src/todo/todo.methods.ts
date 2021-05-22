import { Message, TextChannel } from "discord.js";
import { TodoEntry, TodoList } from "./todo.models";

export const createTodoList = async (
  name: string,
  channel: TextChannel
): Promise<TodoList> => {
  const message = await channel.send({ content: `> __**${name}**__` });
  return new TodoList(name, message);
};

export const appendTodoEntryLine = async (
  todoList: TodoList,
  todoEntry: TodoEntry
): Promise<void> => {};
