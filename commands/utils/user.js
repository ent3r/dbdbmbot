const { getMember, formatDate } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "user",
  aliases: ["userinfo", "who"],
  category: "utils",
  description: "Returns info about a user",
  usage: "[username | id | mention]",
  run: async (client, message, args) => {
    const member = getMember(message, args.join(" "));
    if (!member) {
      message.channel.send("Could not find that user");
      return;
    }
    const joined = formatDate(member.joinedAt);
    const roles =
      member.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r)
        .join(", ") || "none";
    const created = formatDate(member.user.createdAt);

    const memberInformationEmbed = new MessageEmbed()
      .setFooter(member.displayName, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(
        member.displayHexColor === "#000000"
          ? "#FFFFFF"
          : member.displayHexColor
      )
      .setTitle("Member information")
      .addField("Display name", member.displayName, true)
      .addField("Join date", joined, true)
      .addField("Roles", roles)
      .addField("\n -----------", "**User information**")
      .addField("Tag", member.user.tag, true)
      .addField("Username", member.user.username, true)
      .addField("ID", member.user.id, false)
      .addField("Created at", created, true);
    message.channel.send(memberInformationEmbed);
  }
};
