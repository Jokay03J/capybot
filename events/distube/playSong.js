const { EmbedBuilder } = require("discord.js")

module.exports = {
  once: false,
  name: "playSong",
  execute(queue, song) {
    const embed = new EmbedBuilder()
    queue.textChannel.send(
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
  }
}