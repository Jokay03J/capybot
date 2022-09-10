const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("resume music")
    .setDescriptionLocalizations({ fr: "reprend la musique" }),
  async execute(interaction) {
    try {
    const queue = interaction.client.distube.getQueue(interaction);
    if (!queue) return await interaction.reply("Il n'y a pas de musique en cours");
    interaction.client.distube.resume(interaction);
    await interaction.reply("J'ai repris la musique");
    } catch (error) {
      return await interaction.reply(":x: la musique est déjà en cours");
    }
  }
}