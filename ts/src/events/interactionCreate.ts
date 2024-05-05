import {
  ChatInputCommandInteraction,
  ModalSubmitInteraction
} from "discord.js";
import Command from "../types/command";
import Event from "../types/event";
import Bot from "../bot";

export default class InteractionCreateEvent extends Event {
  constructor() { super({ name: "interactionCreate" }); }

  public async execute(client: Bot, interaction: ChatInputCommandInteraction | ModalSubmitInteraction) {
    if (interaction.isChatInputCommand()) {
      if (interaction.channel?.isDMBased()) return;

      const command: Command | undefined = client.commands.get(interaction.commandName);
      if (!command) return;

      if (!interaction.memberPermissions?.has(command.userPermissions))
        return await interaction.reply({ content: "You can't use this command!", ephemeral: true });

      try {
        return await command.execute(interaction, client);
      } catch (err) {
        await interaction.reply({ content: `Error while executing command:\n\`\`\`ts\n${err}\n\`\`\``, ephemeral: true });
        return console.error(err);
      }
    }

    // else if (interaction.isButton()) { }
    // else if (interaction.isAnySelectMenu()) { }
    else if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return await interaction.reply({ content: `No modal found.`, ephemeral: true });

      try {
        return await modal.execute(interaction, client);
      } catch (err) {
        await interaction.reply({ content: `Error while executing modal:\n\`\`\`ts\n${err}\n\`\`\``, ephemeral: true });
        return console.error(err);
      }
    }
  }
}
