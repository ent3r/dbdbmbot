module.exports = {
  name: "editannouncement",
  aliases: ["editannounce, eann"],
  category: "notif",
  description: "Edits an announcement with a given ID",
  usage: '< announcementID > "< message >" [ ateveryone (true|false) ]',
  enabled: false,
  run: async (client, message, args) => {
    console.log("EDITANNOUNCEMENT");
  }
};
