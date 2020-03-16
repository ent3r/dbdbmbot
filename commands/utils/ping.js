const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: [],
  roles: [],
  category: "utils",
  description: "Returns latency and API ping",
  usage: "",
  /**
   *Shows channel ping
   *
   * @param {Client} client the client object
   * @param {Message} message the whole message
   * @param {Array} args arguments (Not used here)
   * @returns void
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed().setTitle("Pinging...").setColor("#FFCC00");
    message.channel.send(embed).then(m => {
      embed
        .setTitle("Pong!")
        .setColor("#00FF00")
        .setFooter(message.author.username, message.author.avatarURL)
        .setTimestamp(new Date())
        .addField(
          "Round trip latency",
          `${Math.floor(m.createdAt - message.createdAt)}ms`
        )
        .addField("Discord API Latency", `${Math.round(client.ws.ping)}ms`);

      m.edit(embed);
    });
    return;
  }
};
