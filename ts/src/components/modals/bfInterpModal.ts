import { ModalSubmitInteraction } from "discord.js";
import Modal from "../../types/modal";
import Bot from "../../bot";

export default class BfInterpModal extends Modal {
  constructor() { super({ customId: "bfInterpModal" }); }

  public async execute(interaction: ModalSubmitInteraction, client: Bot) {
    return await interaction.reply({ content: "Coming soon..." });
  }
}
