const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "utils",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {
    const embed = new MessageEmbed().setTitle("Pinging...").setColor("#FFCC00");
    message.channel.send(embed).then(m => {
      embed
        .setTitle("Pong!")
        .setColor("#FFCC00")
        .setFooter(message.author.username, message.author.avatarURL)
        .setTimestamp(new Date())
        .addField(
          "Round trip latency",
          `${Math.floor(m.createdAt - message.createdAt)}ms`
        )
        .addField("Discord API Latency", `${Math.round(client.ping)}ms`);

      m.edit(embed);
    });
  }
};
