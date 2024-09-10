import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Bot from "../../bot";
import Command, { OptionType } from "../../types/command";
import dyslexify from "dyslexia"; // tfw relying on a 9+ year old library instead of writing your own solution.

export default class DyslexifyCommand extends Command {
  constructor() {
    super({
      data: {
        name: "dyslexify",
        description: "Garble some text to look like someone dyslexic wrote it!",
        options: [
          {
            name: "text",
            description: "Text to garble.",
            type: OptionType.STRING,
            required: true
          }
        ]
      },
      category: "FUN"
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    const text = interaction.options.getString("text", true);
    const embed = new EmbedBuilder({
      author: {name: interaction.user.username ?? 'Unknown', icon_url: interaction.user.avatarURL({ forceStatic: false }) ?? ''},
      description: `\`\`\`txt\n${dyslexify(text)}\n\`\`\`\n\n-# OG text: ${text}`,
    });

    return await interaction.reply({ embeds: [embed] });
  }
}
