import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Command, { OptionType } from "../../types/command";
import Bot from "../../bot";

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
    const user = interaction.options.getUser("member", true);
    const reason = interaction.options.getString("reason", false) ?? "No reason given.";
    if (!user) return;

    const member = interaction.guild?.members.cache.get(user.id);
    if (!member) return;

    if (member.kickable) {
      const defer = await interaction.deferReply({ ephemeral: true });

      try {
        await member.send({ content: `You were kicked from ${interaction.guild?.name}.\n\`\`\`txt\n${reason}\n\`\`\`` });
      } catch { }

      await member.kick(reason);
      return await defer.edit({ content: `Successfully kicked **${member.user.username}**!` });
    }

    switch (member.user.id) {
      case client.user?.id: return await interaction.reply({ content: "# >:(", ephemeral: true });
      case interaction.user.id: return await interaction.reply({ content: "leave button??", ephemeral: true });
      case interaction.guild?.ownerId: return await interaction.reply({ content: "-# i'm gonna tell em' what you just tried to do.", ephemeral: true });
    }

    return await interaction.reply({ content: `I can't kick **${member.user.username}**!`, ephemeral: true });
  }
}
