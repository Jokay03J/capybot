const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("test le ping du bot"),
  async execute(interaction) {
    await interaction.reply(` Pong ! <:gru:1017864865240584362> le ping du bot est actuellement de ${interaction.client.ws.ping}ms`);
  }
}