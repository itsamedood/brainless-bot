import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../../bot";
import Command from "../../types/command";

export default class PingCommand extends Command {
  constructor() {
    super({
      data: {
        name: "ping",
        description: "Pong!"
      },
      category: "MISC"
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    return await interaction.reply({ content: "Pong!" });
  }
}
