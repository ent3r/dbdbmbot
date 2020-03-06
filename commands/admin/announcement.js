const { MessageEmbed, Client } = require("discord.js");
const { getChannelFromMention } = require("../../functions.js");
const fs = require("fs");

module.exports = {
  name: "announcement",
  aliases: ["announce"],
  roles: ["Owner"],
  category: "notif",
  description: "Makes a new announcement",
  usage:
    '< channel | channel id > < ateveryone (true|false) > < "title" > < "message" > ',
  enabled: true,
  run: async (client, message, args) => {
    let channel = getChannelFromMention(client, args[0]);

    const everyone = args[1] === "true";
    let announcement = message.toString().match(/("[^"]+") ("[^"]+")/);

    const announcementEmbed = new MessageEmbed()
      .setTitle(announcement[1].slice(1, -1))
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField("----------------", announcement[2].slice(1, -1));
    const msg = await channel
      .send(announcementEmbed)
      .then(m => m.edit(announcementEmbed.setFooter(m.id)));
    if (everyone) channel.send("@everyone");

    const jsonElement = {
      id: msg.id,
      authors: [message.author],
      channel: msg.channel.id,
      message: announcement[2].slice(1, -1),
      title: announcement[1].slice(1, -1),
      raw_object: msg
    };

    client.announcements.recent_announcement = jsonElement.id;
    client.announcements.announcements.push(jsonElement);

    fs.writeFileSync(
      `${client.my_config.bot_root}/data/announcements.json`,
      JSON.stringify(client.announcements)
    );
  }
};
