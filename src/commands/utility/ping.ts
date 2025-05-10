import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction, Interaction } from 'discord.js';
import type { SlashCommand } from '../../core/command';

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      interaction.reply('Pong!');
    }
  },
};

export default command;
