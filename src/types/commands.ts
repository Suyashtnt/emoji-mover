import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/structures/message.ts"
import { Guild } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/structures/guild.ts"

export interface Command {
  dmOnly?: boolean
  guildOnly?: boolean
  nsfw?: boolean
  callback: (message: Message, args: string[], guild?: Guild) => unknown
}
