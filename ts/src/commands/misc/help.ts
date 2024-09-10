import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Bot from "../../bot";
import Command from "../../types/command";

export default class HelpCommand extends Command {
  constructor() {
    super({
      data: {
        name: "help",
        description: "Stop it, get some help."
      },
      category: "MISC"
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    const hembed = new EmbedBuilder({
      //         8        7       6
      title: "Official Discord server :)",
      color: 0xD02401,
      thumbnail: { url: client.user?.avatarURL() ?? '' },
      url: "https://discord.gg/ZFJRD76xzp",
      description: "Join the official server if you need assistance or wanna report something my creator messed up!"
    });

    return interaction.reply({ embeds: [hembed] });
  }
}
