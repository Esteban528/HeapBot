import { Events, ActivityType } from 'discord.js';
import type { EventHandler } from '../../core/eventHandler';

const guildId = process.env.GUILD_ID;

const onJoinAutorole: EventHandler<typeof Events.GuildMemberAdd> = {
	name: Events.GuildMemberAdd,
	once: true,
	execute(member) {
    if ((guildId != member.guild.id)) return;
    if (member.user.bot)
      member.roles.add('1241966141195161661');
    else 
      member.roles.add('1241434736375627958');
	},
};

export default onJoinAutorole;
