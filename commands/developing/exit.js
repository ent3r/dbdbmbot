module.exports = {
  name: "exit",
  aliases: ["quit", "stop", "logout"],
  roles: ["developer"],
  description:
    "Logs out, terminates the connection to Discord, and destroys the client.",
  category: "dev",
  usage: "",
  run: async (client, message, args) => {
    client.destroy();
  }
};
