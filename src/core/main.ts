import { Client, Events, GatewayIntentBits, MessageFlags, REST, Routes } from 'discord.js';
import commandHandler from './commandHandler';
import { eventLoader } from './eventHandler';

/** 
 * @file Main entry point for the Discord bot.
 * This script initializes the Discord.js client, sets up basic event listeners,
 * logs the bot into Discord, and loads command and event handlers.
 */

const token = process.env.DISCORD_TOKEN;

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
