const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mp3")
    .setDescription("play mp3 in voice channel")
    .setDescriptionLocalizations({ fr: "joue un mp3 dans un salon vocal" })
    .addAttachmentOption((option) =>
      option
        .setName("file")
        .setNameLocalizations({ fr: "fichier" })
        .setDescription("mp3 file")
        .setDescriptionLocalizations({ fr: "fichier mp3" })
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const file = interaction.options.getAttachment("file");

      if (!interaction.member.voice.channel)
        return await interaction.reply("Veuillez être dans un salon vocal");

      if(interaction.client.distube.queue) await interaction.client.distube.stop(interaction.member.voice.channel);

      await interaction.client.distube.play(
        interaction.member.voice.channel,
        file.url,
        {
          member: interaction.member,
          textChannel: interaction.channel,
          interaction,
        }
      )
    } catch (error) {
      return await interaction.reply(
        "Type de fichier non valide <:Shrigga:1017840590320324740> "
      );
    }
  },
};
