import { Events, type Message } from 'discord.js';
import type { EventHandler } from '../../core/eventHandler';
import { genaiMain } from '../../core/genaiClient';
import { replyMessage } from '../../core/utils/messageUtils';
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

const iaClientMessage: EventHandler<typeof Events.MessageCreate> = {
  name: Events.MessageCreate,
  execute(message: Message) {
    if ((guildId != message.guild?.id)) return;
    if (message.author.id == clientId) return;
    if (!message.content.startsWith(`<@${clientId}>`)) return;

    let prompt = message.content

    if (message.reference?.messageId) {
      try {
        const original = message.fetchReference();
        original.then(original => {
          prompt += `\n\n---\nReply to:\n${original.content}`;
          processMessage(message, prompt);
        })

      } catch (err) {
        console.error('Error: ', err);
      }
    } else processMessage(message, prompt);

  },
};

export default iaClientMessage;

function processMessage(message: Message, prompt: string) {
  const iaReponse = genaiMain(prompt);
  iaReponse.then(response => {
    if (response != undefined)
      replyMessage(response, message)
    else
      message.reply("No puedo responder eso");
  })
}
