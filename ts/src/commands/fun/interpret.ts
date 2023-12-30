import {
  ActionRowBuilder,
  ChatInputCommandInteraction
} from "discord.js";
import Bot from "../../bot";
import Command from "../../types/command";

export default class InterpretCommand extends Command {
  constructor() {
    super({
      data: {
        name: "interpret",
        description: "Interprets Brainf**k code!"
      },
      category: "FUN"
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    return await interaction.reply({ content: "Coming soon..." });
  }
}
