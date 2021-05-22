import "dotenv";
import { Client } from "discord.js";
import { CommandHandler } from "./commands/frame/command.handler";
import { CreateCommand } from "./commands/userspace/todo.command";

const client: Client = new Client();
const commandHandler: CommandHandler = new CommandHandler();

client.on("ready", () => {
  console.log(`Bot ready as ${client?.user?.tag}`);
});

commandHandler.addCommand(new CreateCommand());

client.on("message", (msg) => {
  if (msg.content.startsWith(process.env.PREFIX ?? "-")) {
    commandHandler.handleMessage(msg);
  }
});

console.log(`TOKEN: ${process.env.BOT_TOKEN}`);
console.log(`PREFIX: '${process.env.PREFIX}'`);

client.login(process.env.BOT_TOKEN);
