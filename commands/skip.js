const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("skip")
  .setNameLocalizations({"fr": "sauter"})
  .setDescription("skip song")
  .setDescriptionLocalizations({"fr": "saute la musique en cours"}),
  async execute(interaction) {
    try {
      await interaction.deferReply();
    await interaction.client.distube.skip(interaction.member.voice.channel);
    await interaction.editReply("J'ai bien jouer la musique suivante");
    } catch (error) {
      console.log(error);
      await interaction.reply(":x: Veuillez être dans le salon vocal");
    }
  }
}