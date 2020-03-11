# jadb - JustAnotherDiscordBot

This is my personal discord bot project.
If you want to use this, make a new file in the root of the project. This will contain your bot prefix. Name it `serverinfo.js`.

```js
module.exports = {
  token: "YourDiscordBotToken",
  prefix: "_",
  roles: {
    // These are not in use right now, but they might later.
    admin: "", // Put the IDs of the channels and roles in here.
    muted: ""
  },
  channels: {
    logs: "",
    admin_commands: "",
    general_commands: ""
  },
  bot_root: __dirname
};
```

And also remember `npm i` and node has to be v12^
