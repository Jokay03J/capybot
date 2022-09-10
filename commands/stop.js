const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop song")
    .setDescriptionLocalizations({ fr: "arrête la musique en cours" }),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      await interaction.client.distube.stop(interaction.member.voice.channel);
      await interaction.editReply("J'ai bien stopper la musique");
    } catch (error) {
      console.log(error);
      await interaction.reply(":x: Veuillez être dans le salon vocal");
    }
  },
};
