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
    if (args.length < 4) {
      message.channel.send(
        `Not enough args. Do \`${client.my_config.prefix}help\` to see usage.`
      );
    }
    const announcement = await message.channel.messages.fetch(args[0]);
    let newEmbed = announcement.embeds[0];
    const mode = args[1].toLowerCase();
    const what = args[2].toLowerCase();
    if (!announcement) {
      message.channel.send(
        "Cannot find that message. Did you type the ID correctly?"
      );
      return;
    } else if (!newEmbed) {
      message.channel.send("The selected message has no embed");
      return;
    } else if (!["prepend", "replace", "append"].includes(mode)) {
      message.channel.send(
        `Invalid mode ${mode}. Select any of \`prepend\`, \`replace\`, or \`append\``
      );
      return;
    } else if (!["title", "body", "both"].includes(what)) {
      message.channel.send(
        `Invalid selector ${what}. Select any of \`title\`, \`body\`, or \`both\``
      );
      return;
    } else if (!newEmbed.embed_type === "announcement") {
      message.channel.send("This embed is not an announcement. Cannot edit");
      return;
    }
    let newTitle = newEmbed.title;
    let newMsg = newEmbed.description;

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
            if (!args.length >= 4) {
              message.channel.send("Missing argument for `body`");
              return;
            }
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
            if (!args.length >= 4) {
              message.channel.send("Missing argument for `body`");
              return;
            }
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
            if (!args.length >= 4) {
              message.channel.send("Missing argument for `body`");
              return;
            }
            newTitle += args[3];
            newMsg += args[4];
            break;
        }
        break;
    }

    newEmbed.title = newTitle;
    newEmbed.description = newMsg;
    message.channel.messages.fetch(args[0]).then(m => m.edit(newEmbed));
  }
};
