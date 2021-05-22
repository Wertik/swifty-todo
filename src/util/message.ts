import { DMChannel, Message, NewsChannel, TextChannel } from "discord.js";

export const sendMessage = (
  channel: TextChannel | DMChannel | NewsChannel,
  content: string
) => {
  channel.send({ content: content });
};

export const appendMessage = (
  message: Message,
  appender: string,
  newLine: boolean = false
) => {
  message.edit({
    content: newLine
      ? message.content.concat("\n").concat(appender)
      : message.content.concat(appender),
  });
};
