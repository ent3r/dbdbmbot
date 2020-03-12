const { MessageEmbed, Client } = require("discord.js");
const {
  getChannelFromMention,
  updateAnnouncementsDB
} = require("../../functions.js");
const fs = require("fs");

module.exports = {
  name: "announcement",
  aliases: ["announce"],
  roles: ["owner"],
  category: "notif",
  description: "Makes a new announcement",
  usage:
    '< channel | channel id > < ateveryone (true|false) > < "title" > < "message" > ',
  enabled: true,
  run: async (client, message, args) => {
    const channel = getChannelFromMention(client, args[0]);
    const everyone = args[1] === "true";
    const title = args[2];
    const announcement = args[3];

    const announcementEmbed = new MessageEmbed()
      .setTitle(title)
      .setTimestamp()
      .setDescription(announcement);
    channel
      .send(announcementEmbed)
      .then(m => m.edit(announcementEmbed.setFooter(m.id)));
    announcementEmbed.embed_type = "announcement";
    if (everyone) channel.send("@everyone");
  }
};
