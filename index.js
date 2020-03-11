const { Client, Collection } = require("discord.js");
const fs = require("fs");
const parser = require("discord-command-parser")

const config = require("./serverinfo.js");
const prefix = config.prefix;

const client = new Client();

client.announcements = JSON.parse(
  fs.readFileSync("data/announcements.json", "utf-8")
);
client.my_config = config;
client.commands = new Collection();
client.aliases = new Collection();

client.once("ready", () => {
  require("./events/ready.js").run(client);
});

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

client.on("message", async message => {
  const parsed = parser.parse(message, prefix);
  if (!parsed.success) {
    // Something failed parsing the message
    console.log(`${parsed.code}: ${parsed.error}`);
    return;
  }
  if (!message.guild) {
    // It's a DM
    message.channel.send("This bot does not work in DMs");
    return;
  }

  let command = client.commands.get(parsed.command);
  if (!command)
    command = client.commands.get(client.aliases.get(parsed.command));

  if (command) command.run(client, message, parsed.arguments);
});

client.login(config.token);
