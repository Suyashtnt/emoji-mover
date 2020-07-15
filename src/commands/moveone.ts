import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/structures/message.ts"
import { botCache } from "../../mod.ts"
import { cache } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/utils/cache.ts"
import { sendMessage, createEmoji, emojiURL } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/mod.ts"
import { Guild } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/structures/guild.ts"

const moveone = async (message: Message, args: string[], guild?: Guild) => {
  if (!guild) return
  sendMessage(message.channel, "getting emojis")

  const emoji = args[0]

  var headers = new Headers({})

  //@ts-ignore
  var request = new Request(emojiURL(emoji, false))

  await fetch(request, {
    method: "GET",
    headers: headers,
    mode: "cors",
    cache: "default",
  }).then((response) => {
    response.arrayBuffer().then((buffer) => {
      var base64Flag = "data:image/jpeg;base64,"
      var imageStr = arrayBufferToBase64(buffer)
      console.log(base64Flag + imageStr)
      createEmoji(guild.id, `${args[1]}`, base64Flag + imageStr, {
        reason: "imported",
        roles: [],
      })
    })
  })
  return sendMessage(message.channel, "finished!")
}

botCache.commands.set(`moveone`, {
  guildOnly: true,
  callback: moveone,
})

function arrayBufferToBase64(buffer: any) {
  var binary = ""
  var bytes = [].slice.call(new Uint8Array(buffer))

  bytes.forEach((b) => (binary += String.fromCharCode(b)))

  return window.btoa(binary)
}
