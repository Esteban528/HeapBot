import { Events, type Message } from 'discord.js';
import type { EventHandler } from '../../core/eventHandler';

const messageCreate: EventHandler<typeof Events.MessageCreate> = {
	name: Events.MessageCreate,
	execute(message: Message) {
		if (message.content === '!heapbot') {
			message.reply('Hola soy HeapBot! Mi nombre es alucivo a la Heap Memory');
		}
	},
};

export default messageCreate;

