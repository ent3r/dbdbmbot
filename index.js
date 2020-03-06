const { Client, Collection } = require("discord.js");
const fs = require("fs");

const config = require("./serverinfo.js");
const prefix = config.prefix;

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();

client.once("ready", () => {
  require("./events/ready.js").run(client)
});

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.guild) {
  }
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.login(config.token);
