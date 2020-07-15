// This file is meant to show how you can create multiple commands in the same file if you wish.
import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/structures/message.ts"
import { botCache } from "../../mod.ts"
import { cache } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/utils/cache.ts"
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/handlers/channel.ts"

const pingCommand = (message: Message) => {
  return sendMessage(message.channel, `Ping MS: ${Date.now() - message.timestamp}ms`)
}

botCache.commands.set(`ping`, {
  callback: pingCommand,
})
