// Importa clases necesarias de Discord.js
import { Client, Collection, Events, GatewayIntentBits, MessageFlags, REST, Routes } from 'discord.js';
import commandHandler from './commandHandler';
import { eventLoader } from './eventHandler';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Hey! Logged in as ${readyClient.user.tag}`);
});

client.login(token);

commandHandler(client);
eventLoader(client);
