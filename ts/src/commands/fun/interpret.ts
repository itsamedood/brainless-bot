import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  ModalActionRowComponentBuilder,
  TextInputBuilder,
  TextInputStyle } from 'discord.js';
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
    const bfInterpModal = new ModalBuilder({
      customId: "bfInterpModal",
      title: "Code Input",
      components: [
        new ActionRowBuilder<ModalActionRowComponentBuilder>({
          components: [
            new TextInputBuilder({ customId: "codeInput", label: "Input your Brainf**k code here!", style: TextInputStyle.Paragraph, required: true })
          ]
        })
      ]
    });

    return await interaction.showModal(bfInterpModal);
  }
}
