import { Message } from "discord.js";
import mongoose, { Schema } from "mongoose";
import {
  TodoEntryDoesNotExistError,
  TodoNameAlreadyTakenError,
} from "./todo.exception";

export class TodoList {
  public entries: TodoEntry[] = [];

  constructor(public name: string, public message: Message) {}

  public addEntry = (entry: TodoEntry) => {
    if (this.entries.find(({ name }) => entry.name === name)) {
      throw new TodoNameAlreadyTakenError(
        `ToDoEntry name ${entry.name} is already taken.`
      );
    }

    this.entries.push(entry);
  };

  public getEntry = (entryName: string) => {
    return this.entries.find(({ name }) => entryName === name);
  };

  public removeEntry = (entryName: string) => {
    const entry: TodoEntry | undefined = this.getEntry(entryName);

    if (!entry) {
      throw new TodoEntryDoesNotExistError(
        `TodoEntry with the name ${entryName} does not exist.`
      );
    }

    this.entries.slice(this.entries.indexOf(entry), 1);
  };
}

export class TodoEntry {
  constructor(
    public name: string,
    public description: string,
    public importance: number
  ) {}
}

export const TodoEntrySchema: Schema = new Schema({
  name: String,
  description: String,
  importance: Number,
});

export interface TodoListDto {
  name: string;
  message: {
    channelId: string;
    messageId: string;
  };
  entries: TodoEntry[];
}

export const TodoListSchema: Schema = new Schema({
  name: String,

  message: {
    channelId: String,
    messageId: String,
  },

  entries: [TodoEntrySchema],
});

export const todoListModel = mongoose.model<Document & TodoListDto>(
  "TodoList",
  TodoListSchema
);
