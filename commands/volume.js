const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("adjuste volume")
    .setDescriptionLocalizations({ fr: "change le volume" })
    .addIntegerOption((option) =>
      option
        .setName("volume")
        .setDescription("volume à mettre")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.client.distube.setVolume(
        interaction.member.voice.channel,
        interaction.options.getInteger("volume")
      );
      await interaction.reply("J'ai bien changer le volume");
    } catch (error) {
      console.log(error);
      await interaction.reply(":x: Veuillez être dans le salon vocal");
    }
  },
};
