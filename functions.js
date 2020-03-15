module.exports = {
  /**
   *Gets a member from a string
   *
   * @param {*} message The whole message
   * @param {string} [toFind=""] often arguments
   * @returns a user
   */
  getMember: function(message, toFind = "") {
    toFind = toFind.toLowerCase();
    if ("@everyone" in message) return;
    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.cache.find(member => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target) target = message.member;

    return target;
  },

  /**
   *Formats a string to nb-NO format
   *
   * @param {*} date the date to be formatted
   * @returns the formatted string
   */
  formatDate: function(date) {
    return new Intl.DateTimeFormat("nb-NO").format(date);
  },

  getUserFromMention: function(client, mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;

    const id = matches[1];

    return client.users.cache.get(id);
  },

  getChannelFromMention: function(client, mention) {
    const matches = mention.match(/^<#(\d+)>$/);

    if (!matches) return;

    const id = matches[1];

    return client.channels.cache.get(id);
  /**
   *Logs an event to the logging channel specified in the config
   *
   * @param {Client} client the discord Client() class
   * @param {String} type what type of event it was, eg. mute or ban. This will be the title of the embed
   * @param {String} event what message should be displayed. E.g. "User was muted". This will be the description of the embed
   * @param {User} commandAuthor who ran the command
   * @returns null
   */
  }
};
