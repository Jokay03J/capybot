module.exports = {
  name: "onInteractionCreate",
  once: false,
  async execute(interaction) {
    switch (interaction.customId) {
      case "chooseSearch":
        await interaction.client.distube.play(
          interaction.member.voice.channel,
          interaction.values[0],
          {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction,
          }
        );
        return await interaction.reply({content: "Musique ajoutée à la file d'attente",ephemeral: true});
        break;
    }
  },
};
