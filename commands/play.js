const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setNameLocalizations({ fr: "jouer" })
    .setDescription("play song")
    .setDescriptionLocalizations({ fr: "joue la musique" })
    .addStringOption((option) =>
      option
        .setName("music")
        .setNameLocalizations({ fr: "musique" })
        .setDescription("music name or music url")
        .setDescriptionLocalizations({ fr: "musique à jouer(url ou nom)" })
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      if (!interaction.member.voice.channel)
        return interaction.editReply(":x: Veuillez être dans un salon vocal");

        const music = await interaction.options.getString("music");

        if (music.startsWith("http")) {
          if (!music.includes("youtube.com"))
            return await interaction.editReply(":x: lien invalide");
        }

      await interaction.client.distube.play(
        interaction.member.voice.channel,
        interaction.options.getString("music"),
        {
          member: interaction.member,
          textChannel: interaction.channel,
          interaction,
        }
      );
      await interaction.editReply("J'ai bien jouer la musique demander");
    } catch (error) {
      console.log(error);
      return await interaction.reply(
        "Il y a eu une erreur\nurl invalide ou musique introuvable"
      );
    }
  },
};
