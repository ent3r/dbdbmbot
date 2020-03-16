const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["info"],
  roles: ["everyone"],
  category: "utils",
  description: "Gives help on a command",
  usage: "[ command ]",

  run: async (client, message, args) => {
    const responseEmbed = new MessageEmbed()
      .setTimestamp()
      .setTitle("Help")
      .setFooter(message.author.username, message.author.displayAvatarURL());
    if (args[0]) {
      let command = client.commands.get(args[0]);
      if (!command) {
        command = client.commands.get(client.aliases.get(args[0]));
      }
      if (!command) {
        responseEmbed
          .setColor("#ff0000")
          .addField(
            "Error",
            `Command ${args[0]} was not found. Did you spell it correctly?`
          );
      } else {
        responseEmbed
          .addField(
            command.name,
            `**Description:** ${command.description}\n **Usage:** \`${command.name} ${command.usage}\`\n**Aliases:** ${command.aliases}\n`
          )
          .setColor("00FF00");
      }
    } else {
      let description = `These are all the commands available to you. Current prefix is \`${client.my_config.prefix}\`\n`;
      client.commands.forEach(element => {
        description += `\n**\`${element.name}\`**\n${element.description}`;
      });
      responseEmbed.setDescription(description).setColor("#00FF00")
    }
    message.channel.send(responseEmbed);
  }
};
