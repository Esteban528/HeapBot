import { SlashCommandBuilder, PermissionFlagsBits, Role, ChatInputCommandInteraction, Interaction } from 'discord.js';
import type { SlashCommand } from '../../core/command';

const massRoleAsign: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('mass_role_asign')
    .setDescription('Asigna un rol a todos los usuarios!')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('El rol que deseas agregar a todos los usuarios')
        .setRequired(true)
    ),

  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      await interaction.reply({ content: 'No tienes permisos para ejecutar esta función.', ephemeral: true });
      return;
    }

    const role = interaction.options.getRole('role') as Role;

    if (!role || !interaction.guild) {
      return interaction.reply({ content: 'No se pudo obtener el rol o el servidor.', ephemeral: true });
    }

    await interaction.deferReply();

    const members = await interaction.guild.members.fetch();
    let success = 0;

    for (const member of members.values()) {
      if (member.user.bot) continue;
      try {
        await member.roles.add(role);
        success++;
      } catch (error) {
        console.error(`Error al asignar rol a ${member.user.username}:`, error);
      }
    }

    await interaction.editReply(`Rol asignado a ${success} usuario(s).`);
  },
};

export default massRoleAsign;
