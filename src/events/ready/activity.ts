import { Events, ActivityType } from 'discord.js';
import type { EventHandler } from '../../core/eventHandler';

const ready: EventHandler<typeof Events.ClientReady> = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity('estebandev.xyz', {
			type: ActivityType.Watching,
		});
	},
};

export default ready;
