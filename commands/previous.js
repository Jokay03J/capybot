const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("previous")
  .setNameLocalizations({"fr": "précédent"})
  .setDescriptionLocalizations({"fr": "joue la musique précédente"})
  .setDescription("play previous song"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
    await interaction.client.distube.previous(interaction.member.voice.channel);
    await interaction.editReply("J'ai bien jouer la musique précédente");
    } catch (error) {
      console.log(error);
      await interaction.reply(":x: Veuillez être dans le salon vocal");
    }
  }
}