module.exports.run = (client) => {
    client.user.setPresence({
      game: {
        name: "with discord.js"
      },
      status: "online"
    });
    console.log(`Logged in as ${client.user.tag}!`);
}
