const { SlashCommandBuilder } = require("discord.js");
const { SpotifyPlugin } = require("@distube/spotify");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spotify")
    .setDescription("play spotify song")
    .setDescriptionLocalizations({ fr: "joue la musique spotify" })
    .addStringOption((option) =>
      option.setName("url").setDescription("url spotify").setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      if (!interaction.member.voice.channel)
        return interaction.editReply(":x: Veuillez être dans un salon vocal");

      const url = await interaction.options.getString("url");

      if (!url.includes("open.spotify.com"))
        return await interaction.editReply(":x: lien invalide");

      await interaction.client.distube.play(
        interaction.member.voice.channel,
        url,
        {
          member: interaction.member,
          textChannel: interaction.channel,
          interaction,
        }
      );
      await interaction.editReply("musique ajouter à la file d'attente");
    } catch (error) {
      console.log(error);
      return await interaction.reply(
        "Il y a eu une erreur\nurl invalide ou musique introuvable"
      );
    }
  },
};
