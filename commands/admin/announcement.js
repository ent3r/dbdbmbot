module.exports = {
  name: "announcement",
  aliases: ["announce"],
  category: "notif",
  description: "Makes a new announcement",
  usage: '< channel | channel id > "< message >" [ ateveryone (true|false) ]',
  enabled: false,
  run: async (client, message, args) => {
    console.log("ANNOUNCEMENT");
  }
};
