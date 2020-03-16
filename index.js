const { Client, Collection, MessageEmbed } = require("discord.js");
const { logEvent } = require("./functions");
const parser = require("discord-command-parser");

const config = require("./serverinfo.json");
const prefix = config.prefix;

const client = new Client();

client.my_config = config;
client.commands = new Collection();
client.aliases = new Collection();

client.on("ready", () => {
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

  if (command) {
    command.run(client, message, parsed.arguments);
  } else {
    const errorEmbed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Error")
      .setThumbnail()
      .setDescription(`Command \`${parsed.command}\` was not found`);
    message.channel.send(errorEmbed);
  }
});

client.on("guildBanAdd", (guild, user) => {
  logEvent(client, "Ban", `${user.tag} was banned`);
});

client.on("guildBanRemove", (guild, user) => {
  logEvent(client, "Unban", `${user.tag} was unbanned`);
});

client.login(config.token);
