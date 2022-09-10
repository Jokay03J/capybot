const { MessageCollector } = require("discord.js");
const { ActionRowBuilder } = require("discord.js");
const { InteractionCollector } = require("discord.js");
const { SelectMenuBuilder } = require("discord.js");
const { ModalBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setNameLocalizations({ fr: "rechercher" })
    .setDescription("search music")
    .setDescriptionLocalizations({ fr: "recherche une musique" })
    .addStringOption((option) =>
      option.setName("music").setDescription("music name").setRequired(true)
    ),
  async execute(interaction) {
    try {
      interaction.client.distube
        .search(interaction.options.getString("music"), { limit: 5 })
        .then(async (result) => {
          let id = 0;
          const list = result
            .map((item) => {
              id++;
              return `**${id}** ${item.name} - \`${item.formattedDuration}\``;
            })
            .join("\n");
          const embed = new EmbedBuilder()
            .setTitle("Recherche")
            .setDescription(list);

          const row = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
              .setCustomId("chooseSearch")
              .setPlaceholder("selectionner la musique")
              .addOptions(
                {
                  label: "1",
                  description: result[0].name,
                  value: result[0].url,
                },
                {
                  label: "2",
                  description: result[1].name,
                  value: result[1].url,
                },
                {
                  label: "3",
                  description: result[2].name,
                  value: result[2].url,
                },
                {
                  label: "4",
                  description: result[3].name,
                  value: result[3].url,

                },
                {
                  label: "5",
                  description: result[4].name,
                  value: result[4].url,

                }
              )
          );

          await interaction.reply({ embeds: [embed], components: [row]});

          // collector.on("collect", async (message) => {
          //   console.log(message.content);
          //   if (message.content > result.length || message.content === 0)
          //     return message.channel.send("Veuillez entrer un nombre valide");

          //   const song = result[message.content - 1];
          //   await interaction.client.distube.play(
          //     interaction.member.voice.channel,
          //     song.url,
          //     {
          //       member: interaction.member,
          //       textChannel: interaction.channel,
          //       interaction,
          //     }
          //   );
          // });
        });
    } catch (error) {
      console.log(error);
    }
  },
};
