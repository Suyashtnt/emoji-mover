import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/structures/message.ts"
import { botCache } from "../../mod.ts"
import { cache } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/utils/cache.ts"
import { sendMessage, createEmoji } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/mod.ts"
import { Guild } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/structures/guild.ts"

const pingCommand = (message: Message, args: string[], guild: Guild) => {
  if (((args[0] as any) as Guild).emojis) return
  sendMessage(message.channel, "getting emojis")
  const emojis = ((args[0] as any) as Guild).emojis
  for (let i = 0; i < ((args[0] as any) as Guild).emojis.length; i++) {
    createEmoji((guild as any) as string, emojis[i].name, `${emojis[i].id}`, { reason: "imported" })
  }
  return sendMessage(message.channel, "finished!")
}

botCache.commands.set(`move`, {
  guildOnly: true,
  callback: pingCommand,
})
