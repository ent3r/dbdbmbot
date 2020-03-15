const { getMember, logEvent } = require("../../functions");

module.exports = {
  name: "mute",
  aliases: [],
  roles: ["owner", "admin", "mod"],
  category: "administrative",
  description: "Mutes a given user for a given time span. 0 is infinite",
  usage: '< username | id | mention > [ "reason" ]',
  enabled: true,
  run: async (client, message, args) => {
    const member = getMember(message, args.join(" "));
    if (!member) {
      message.channel.send("Could not find that user");
      return;
    }
    member.roles.add(client.my_config.roles.muted);
    if (args[1]) {
      message.channel.send(`Muted this user for reason: ${args[1]}`);
      member.send(`You have been muted in guild ${message.guild.name} for reason: ${args[1]}`)
    } else {
      message.channel.send("Muted user")
      member.send(`You have been muted in guild ${message.guild.name}. No reason was provided`)
    }
    logEvent(client, "Mute", `${member} was muted`, message.author)
    return;
  }
};
