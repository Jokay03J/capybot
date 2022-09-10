const { Client, GatewayIntentBits, Routes, Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const path = require("path");
const fs = require("fs");
const { DisTube } = require("distube");
require("dotenv").config(".env");

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp")

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
	presence: {
		status: 'online',
		activity: {
		 name: 'coder',
		 type: 'PLAYING',
		},
	 },
});
client.distube = new DisTube(client, {
  searchSongs: 5,
  emitNewSongOnly: false,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin()],
});
client.commands = new Collection();
const commands = [];

const eventsPath = path.join(__dirname, "events");
const commandsPath = path.join(__dirname, "commands");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));
const distubeEventFiles = fs
  .readdirSync(path.join(__dirname, "events/distube"))
  .filter((file) => file.endsWith(".js"));
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// event handler
console.log("=======events=======");
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
    console.log(`${event.name} loaded`);
  } else {
    client.on(event.name, (...args) => event.execute(...args));
    console.log(`${event.name} loaded`);
  }
}

// distube event handler
console.log("=======distube events=======");
for (const file of distubeEventFiles) {
  const filePath = path.join(eventsPath + "/distube", file);
  const event = require(filePath);
  if (event.once) {
    client.distube.once(event.name, (...args) => event.execute(...args));
    console.log(`${event.name} loaded`);
  } else {
    client.distube.on(event.name, (...args) => event.execute(...args));
    console.log(`${event.name} loaded`);
  }
}

console.log("=======commands=======");
// command handler
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());

  console.log(`/${command.data.name} loaded`);
}

// set command in rest api discord
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);

// login
client.login(process.env.TOKEN);