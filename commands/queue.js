const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("queue")
  // .setNameLocalizations({"fr": "file d\'attente"})
  .setDescription("show queue")
  // .setDescriptionLocalizations({"fr": "affiche la file d\'attente"})
  ,
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction);
    if (!queue) return await interaction.reply("Il n'y a pas de musique en cours");
    const embed = new EmbedBuilder()
    .setTitle('File d\'attente')
    .setDescription(queue.songs.map((song, id) =>
    `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
).join("\n"))
        interaction.reply({ embeds: [embed] });
  }
}