import { Events, type Message } from "discord.js";
import type { EventHandler } from "../../core/eventHandler";
const clientId = process.env.CLIENT_ID;

const memeReactor: EventHandler<typeof Events.MessageCreate> = {
  name: Events.MessageCreate,

  execute(message: Message) {
    if (!message.channel.name.includes("meme")) return;
    if (message.author.id == clientId) return;
    if (message.attachments.size <= 0) message.delete();

    try {
      message.react("🤣")
      message.react("🥱")
    } catch (e) {}
  },
}

export default memeReactor;
