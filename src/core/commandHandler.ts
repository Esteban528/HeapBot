import { Client, Collection, Events, MessageFlags, REST, Routes, type RESTPostAPIApplicationCommandsResult } from "discord.js";

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { SlashCommand } from "./command";

const commands: any[] = [];

export default async function commandHandler(client: Client) {
  client.commands = new Collection();

  await loadCommands(client);
  await registerCommands(process.env.DISCORD_TOKEN, process.env.CLIENT_ID);
  await loadClientInteractions(client);
}

async function loadCommands(client:Client) {
  const foldersPath = path.join(__dirname, '..', 'commands');
  const commandFolders = fs.readdirSync(foldersPath);
  console.log('Loading commands...');

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const fileUrl = pathToFileURL(filePath).href;

      try {
        const commandModule:SlashCommand = await import(fileUrl);
        const command = commandModule.default ?? commandModule;

        if ('data' in command && 'execute' in command) {
          client.commands.set(command.data.name, command);
          commands.push(command.data.toJSON());
          console.log(`Command loaded: ${command.data.name}`);
        } else {
          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      } catch (error) {
        console.error(`❌ Failed to load command at ${filePath}:`, error);
      }
    }
  }
}

async function loadClientInteractions(client: Client) {

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      }
    }
  });
}

async function registerCommands(token: any, clientId: any) {

  const rest = new REST().setToken(token);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    ) as RESTPostAPIApplicationCommandsResult[];

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
}
