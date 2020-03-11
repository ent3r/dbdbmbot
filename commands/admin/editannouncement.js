const {
  getChannelFromMention,
  updateAnnouncementsDB
} = require("../../functions");
const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "editannouncement",
  aliases: ["editannounce, eann"],
  category: "notif",
  description: "Edits an announcement with a given ID",
  usage:
    '< announcementID > < prepend|replace|append > < title|body|both > [ "new title" ] [ "new message" ]',
  enabled: true,
  run: async (client, message, args) => {
    const announcement = await message.channel.messages.fetch(args[0]);

    let newEmbed = announcement.embeds[0];
    const mode = args[1].toLowerCase();
    const what = args[2].toLowerCase();
    let newTitle = newEmbed.title;
    let newMsg = newEmbed.fields[0].value;

    switch (mode) {
      case "prepend":
        switch (what) {
          case "title":
            newTitle = args[3] + newTitle;
            break;
          case "body":
            newMsg = args[3] + newMsg;
            break;
          case "both":
            newTitle = args[3] + newTitle;
            newMsg = args[4] + newMsg;
            break;
        }
        break;
      case "replace":
        switch (what) {
          case "title":
            newTitle = args[3];
            break;

          case "body":
            newMsg = args[3];
            break;
          case "both":
            newTitle = args[3];
            newMsg = args[4];
            break;
        }
        break;
      case "append":
        switch (what) {
          case "title":
            newTitle += args[3];
            break;

          case "body":
            newMsg += args[3];
            break;
          case "both":
            newTitle += args[3];
            newMsg += args[4];
            break;
        }
        break;
    }

    newEmbed.title = newTitle;
    newEmbed.fields[0].value = newMsg;
    message.channel.messages.fetch(args[0]).then(m => m.edit(newEmbed));
  }
};
