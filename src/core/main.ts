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

client.login(token);

commandHandler(client);
eventLoader(client);
