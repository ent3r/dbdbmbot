module.exports.run = (client) => {
    client.user.setPresence({
      activity: {
        type: "PLAYING",
        name: `with discord.js | ${client.my_config.prefix}help`,
        url: "https://github.com/ent3r/dbdbmbot"
      },
      status: "online"
    });
    console.log(`Logged in as ${client.user.tag}!`);
}
