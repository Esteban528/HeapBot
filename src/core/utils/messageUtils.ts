import { type Message } from "discord.js";

export function replyMessage(content: string, message: Message) {
	if (content.length >= 1990) {
		sanitizer(content).forEach(m => message.reply(m));
	} else message.reply(content);

}

function sanitizer(text: string): string[] {
  const lines = text.split("\n");
  const out: string[] = [];
  let buf = "";
  let inCode = false;
  let code = "";

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (!inCode) {
        inCode = true;
        code = line;
      } else {
        code += "\n" + line;
        inCode = false;

        const joined = buf ? buf + "\n" + code : code;
        if (joined.length < 2000) {
          buf = joined;
        } else {
          if (buf) out.push(buf);
          if (code.length < 2000) {
            buf = code;
          } else {
            out.push(code);
            buf = "";
          }
        }

        code = "";
      }
    } else if (inCode) {
      code += "\n" + line;
    } else {
      const joined = buf ? buf + "\n" + line : line;
      if (joined.length < 2000) {
        buf = joined;
      } else {
        if (buf) out.push(buf);
        buf = line;
      }
    }
  }

  if (buf) out.push(buf);

  return out;
}
