# jadb - JustAnotherDiscordBot

This is my personal discord bot project.
If you want to use this, make a new file in the root of the project. This will contain your bot prefix. Name it `serverinfo.json`.

```json
{
  "token": "YourDiscordToken",
  "prefix": "_",
  "roles": {
    "admin": "", // The ID's of the roles
    "muted": ""
  },
  "channels": {
    "logs": "", // The ID's of the channels
    "admin_commands": "",
    "general_commands": ""
  }
}
```

And also remember `npm i` and node has to be v12^
