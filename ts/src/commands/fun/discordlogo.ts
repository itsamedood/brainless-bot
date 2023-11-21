import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../../bot";
import Command from "../../types/command";

export default class DiscordLogoCommand extends Command {
  constructor() {
    super({
      data: {
        name: "discordlogo",
        description: "Prints the Discord logo using ASCII characters!"
      },
      category: "FUN"
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    return await interaction.reply({ content: [
      "⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄",
      "⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣠⡄⠄⠄⠄⠄⠄⠄⢠⣄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄",
      "⠄⠄⠄⠄⠄⢀⣴⣾⣿⣿⣿⣿⣶⣶⣶⣶⣶⣶⣿⣿⣿⣿⣷⣦⡀⠄⠄⠄⠄⠄",
      "⠄⠄⠄⠄⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠄⠄⠄⠄",
      "⠄⠄⠄⠄⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠄⠄⠄⠄",
      "⠄⠄⠄⣼⣿⣿⣿⣿⣿⡿⠿⠿⣿⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣧⠄⠄⠄",
      "⠄⠄⢠⣿⣿⣿⣿⣿⡟⠄⠄⠄⠈⣿⣿⣿⣿⠁⠄⠄⠄⢹⣿⣿⣿⣿⣿⡄⠄⠄",
      "⠄⠄⢸⣿⣿⣿⣿⣿⣇⠄⠄⠄⠄⣿⣿⣿⣿⠄⠄⠄⠄⣰⣿⣿⣿⣿⣿⡇⠄⠄",
      "⠄⠄⢸⣿⣿⣿⣿⣿⣿⣶⣤⣴⣾⣿⣿⣿⣿⣷⣦⣤⣶⣿⣿⣿⣿⣿⣿⣷⠄⠄",
      "⠄⠄⢸⣿⣿⣿⣿⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⡟⠄⠄",
      "⠄⠄⠄⠙⠻⢿⣿⣿⣷⡤⠈⠉⠉⠛⠛⠛⠛⠉⠉⠁⢤⣾⣿⣿⡿⠟⠉⠄⠄⠄",
      "⠄⠄⠄⠄⠄⠄⠈⠉⠻⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠟⠋⠁⠄⠄⠄⠄⠄⠄",
      "⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄"
    ].join('\n') });
  }
}
