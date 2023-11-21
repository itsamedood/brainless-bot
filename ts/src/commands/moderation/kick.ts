import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Bot from "../../bot";
import Command, { OptionType } from "../../types/command";

export default class KickCommand extends Command {
  constructor() {
    super({
      data: {
        name: "kick",
        description: "Kick a member from the server.",
        options: [
          {
            name: "member",
            description: "Member to kick.",
            type: OptionType.USER,
            required: true
          },
          {
            name: "reason",
            description: "Reason for kick.",
            type: OptionType.STRING,
            required: false
          }
        ]
      },
      category: "MODERATION",
      userPermissions: [PermissionFlagsBits.Administrator, PermissionFlagsBits.KickMembers]
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    
  }
}
