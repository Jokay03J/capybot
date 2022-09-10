const {SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("shuffle")
  .setNameLocalizations({"fr": "mélanger"})
  .setDescriptionLocalizations({"fr": "mélange la file d'attente"})
  .setDescription("shuffle queue"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
    await interaction.client.distube.shuffle(interaction.member.voice.channel);
    await interaction.editReply("J'ai bien mélanger la file d'attente");
    } catch (error) {
      console.log(error);
      await interaction.reply(":x: Veuillez être dans le salon vocal");
    }
  }
}