const fs = require("fs");

module.exports = {
  getMember: function(message, toFind = "") {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.cache.find(member => {
        return (
          member.displayName.toLowerCase().includes(tofind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target) target = message.member;

    return target;
  },

  formatDate: function(date) {
    return new Intl.DateTimeFormat("en-US").format(date);
  },

  getUserFromMention: function(client, mention) {
    // The id is the first and only match found by the RegEx.
    const matches = mention.match(/^<@!?(\d+)>$/);

    // If supplied variable was not a mention, matches will be null instead of an array.
    if (!matches) return;

    // However the first element in the matches array will be the entire mention, not just the ID,
    // so use index 1.
    const id = matches[1];

    return client.users.cache.get(id);
  },

  getChannelFromMention: function(client, mention) {
    // The id is the first and only match found by the RegEx.
    const matches = mention.match(/^<#(\d+)>$/);

    // If supplied variable was not a mention, matches will be null instead of an array.
    if (!matches) return;

    // However the first element in the matches array will be the entire mention, not just the ID,
    // so use index 1.
    const id = matches[1];

    return client.channels.cache.get(id);
  },

  updateAnnouncementsDB: function(client) {
    fs.writeFileSync(
      `${client.my_config.bot_root}/data/announcements.json`,
      JSON.stringify(client.announcements)
    );
  }
};
