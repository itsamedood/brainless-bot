import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../bot';
import Command, { OptionType } from '../../types/command';

export default class EightBallCommand extends Command {
  private readonly RESPONSES = [
    // Yes.
    "Definitely!",
    "Seems quite likely.",
    "Yes, yes, and yes.",
    "100%",
    "Absolutely positively!",

    // No.
    "Of course not!",
    "Absolutely not.",
    "0% chance.",
    "Nope.",
    "No, no, and no.",

    // Maybe.
    "I mean, maybe.",
    "Always a possibility.",
    "Maybe, maybe not.",
    "Yes no maybe so.",
    "Maybe possibly potentially probable.",

    // Unsure.
    "Beats me man.",
    "How should I know?",
    "Idfk, google it.",
    "No clue tbh.",
    "¯\\_(ツ)_/¯"
  ];

  constructor() {
    super({
      data: {
        name: '8ball',
        description: 'Consult the 8-ball of infinite wisdom.',
        options: [
          {
            name: "question",
            description: "Question for the 8-ball. Make sure it ends with a `?`, or it won't work!",
            type: OptionType.STRING,
            required: true
          }
        ]
      },
      category: 'FUN'
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    const question = interaction.options.getString("question", true);
    if (!question.endsWith('?')) return await interaction.reply({ content: "Give me a question! (Make sure your question ends with a `?`).", ephemeral: true });

    const response = new EmbedBuilder({
      description: `## __"${question}"__\n> \`${this.RESPONSES[~~(Math.random() * this.RESPONSES.length)]}\``,
      color: 0x000,
      footer: { text: `${interaction.user.username} asked this question.`, iconURL: interaction.user.avatarURL() ?? '' }
    }).setTimestamp();

    return await interaction.reply({ embeds: [response] });
  }
}
