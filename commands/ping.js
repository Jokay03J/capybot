const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("test le ping du bot"),
  async execute(interaction) {
    await interaction.reply(`le ping du bot est de actuellement ${interaction.client.ws.ping}ms`);
  }
}