import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import Modal from "../../types/modal";
import Bot from "../../bot";

export default class BfInterpModal extends Modal {
  private readonly MAX_ITER = 100_000;

  constructor() { super({ customId: "bfInterpModal" }); }

  public async execute(interaction: ModalSubmitInteraction, client: Bot) {
    const code = interaction.fields.getTextInputValue("codeInput");

    let output = '';
    let data = [0];
    let pointer = 0;
    let loopStart = 0;
    let i = 0;
    let j = 0;

    while (i < code.length && j < this.MAX_ITER) {
      let c = code[i];
      switch (c) {
        case ">":
          pointer++;
          if (data.length < pointer+1) data[pointer] = 0;
          break;

        case "<":
          if (pointer > 0) pointer--;
          break;

        case "+":
          data[pointer]++;
          break;

        case "-":
          data[pointer]--;
          break;

        case ".":
          const value = data[pointer];
          if (value < 0 || value > 127) return await interaction.reply({ content: `${value} out of range.`, ephemeral: true });
          output += String.fromCharCode(value);
          break;

        case ",": return await interaction.reply({ content: `',' not supported. Sorry.`, ephemeral: true });

        case "[":
          loopStart = i;
          break;

        case "]":
          if (data[pointer] != 0) i = loopStart;
          break;
      }

      i++;
      j++;
    }

    if (j == this.MAX_ITER)
      return await interaction.reply({ content: `Max iteration limit reached. Check for infinite loops.\nYour code: \`\`\`bf\n> ${code}\n> \`\`\``, ephemeral: true });

    const outputEmbed = new EmbedBuilder({
      title: "Output:",
      color: 0xFFB5CA,
      description: `\`\`\`txt\n${output}\n\`\`\``,
      fields: [
        {
          name: "Data:",
          value: `\`\`\`ts\n${data}\n\`\`\``,
          inline: false
        },
        {
          name: "Pointer:",
          value: `\`${pointer}\``,
          inline: false
        }
      ],
      footer: { text: `Iterations: ${j}` }
    });

    return await interaction.reply({ embeds: [outputEmbed] });
  }
}
