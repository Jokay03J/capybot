const { EmbedBuilder } = require("discord.js");

module.exports = {
  once: false,
  name: "addSong",
  execute(queue, song) {
    const embed = new EmbedBuilder()
      .setTitle("Ajout d'une musique")
      .setDescription(song.name)
      .addFields(
        { name: "Durée", value: `${song.formattedDuration}`, inline: true },
        {
          name: "Position dans la file d'attente",
          value: `${queue.songs.length}`,
          inline: true,
        },
        {
          name: "Volume",
          value: `${queue.volume}`,
          inline: true,
        },
        {
          name: "Mode de lecture",
          value: `${queue.repeatMode ? queue.repeatMode === 2 ? "Queue" : "Cette musique" : "Off"}`,
          inline: true,
        },
        {
          name: "Filtre",
          value: `${queue.filter || "Off"}`,
          inline: true,
        },
        {
          name: "Autoplay",
          value: `${queue.autoplay ? "On" : "Off"}`,
          inline: true,
        },
        {
          name: "Demander par",
          value: `${song.user}`,
        }
      )
      .setThumbnail(song.thumbnail);
    queue.textChannel.send({ embeds: [embed] });
    // queue.textChannel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}.`);
  },
};
