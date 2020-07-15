import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/structures/message.ts"
import { botCache } from "../../mod.ts"
import { cache } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/utils/cache.ts"
import { sendMessage, createEmoji, emojiURL } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/mod.ts"
import { Guild } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v6/structures/guild.ts"

const move = async (message: Message, args: string[], guild?: Guild) => {
  if (!guild) return
  const guild2 = cache.guilds.get(args[0])
  if (!guild2) return
  sendMessage(message.channel, "getting emojis")

  const emojis = guild2.emojis
  let emojiNames = ["ree"]

  for (let i = 0; i < guild2.emojis.length; i++) {
    emojiNames[i] = guild2.emojis[i].name
    console.log(emojiNames[i])
  }

  if (!emojiNames) return

  var headers = new Headers({ "X-Mashape-Key": "API_KEY" })

  sendMessage(message.channel, emojiNames.join(", "))
  for (let i = 0; i < guild2.emojis.length; i++) {
    if (!emojis[i].id) return
    // @ts-ignore
    var request = new Request(emojiURL(emojis[i].id, false))
    await fetch(request, {
      method: "GET",
      headers: headers,
      mode: "cors",
      cache: "default",
    }).then((response) => {
      response.arrayBuffer().then((buffer) => {
        var base64Flag = "data:image/png;base64,"
        var imageStr = arrayBufferToBase64(buffer)
        createEmoji(guild.id, `${emojiNames[i]}`, base64Flag + imageStr, {
          reason: "imported",
          roles: [],
        })
      })
    })
  }
  return sendMessage(message.channel, "finished!")
}

botCache.commands.set(`move`, {
  guildOnly: true,
  callback: move,
})

function arrayBufferToBase64(buffer: any) {
  var binary = ""
  var bytes = [].slice.call(new Uint8Array(buffer))

  bytes.forEach((b) => (binary += String.fromCharCode(b)))

  return window.btoa(binary)
}
