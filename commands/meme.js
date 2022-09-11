const { SlashCommandBuilder } = require("discord.js");
const memeList = require("../utils/memeList");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("genere un meme face avec des textes")
    .addStringOption((option) =>
      option.setName("haut").setDescription("texte du haut").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("bas").setDescription("texte du bas").setRequired(true)
    ),
  async execute(interaction) {
    const random = Math.floor(Math.random() * memeList.length);
    const bas = interaction.options.getString("bas");
    const haut = interaction.options.getString("haut");

    fetch(
      `https://apimeme.com/meme?meme=${memeList[random]}&top=${haut}&bottom=${bas}`
    )
      .then((res) => {
        interaction.reply({ files: [res.body] });
      })
      .catch((err) => {
        interaction.reply("<:rickroll:1018258944516436061>");
      });
  },
};
