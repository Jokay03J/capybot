const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pause music")
    .setDescriptionLocalizations({ fr: "met en pause la musique" }),
  async execute(interaction) {
    try {
    const queue = interaction.client.distube.getQueue(interaction);
    if (!queue) return await interaction.reply("Il n'y a pas de musique en cours");
    interaction.client.distube.pause(interaction);
    await interaction.reply("J'ai mis en pause la musique");
    } catch (error) {
      return await interaction.reply(":x: la musique est déjà en pause");
    }
  }
}