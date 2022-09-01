# SynixIA

<a href="https://discord.gg/RfBbmrmegw"><img align="right" src="https://media.discordapp.net/attachments/1008815664452087998/1013499646292807770/android-chrome-512x512.png" width=27%></a>

[![Support Server Invite](https://img.shields.io/discord/923558169131749396.svg?color=7289da&label=Chat&logo=discord&style=flat-square)](https://discord.gg/RfBbmrmegw)
[![Version](https://img.shields.io/badge/Version-v0.0.1a-informational?color=7289da&style=flat-square)](#synixia)
[![Node.JS](https://img.shields.io/badge/NODEJS-v16.17^-informational?color=7289da&style=flat-square)](#synixia)
[![LICENSE](https://img.shields.io/badge/LICENSE-GPL_3.0-informational?color=7289da&style=flat-square)](#synixia)

SynixIA Is A OpenSource Code Discord Bot Project, Using [Node.js](https://nodejs.org/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [DiscordJS](https://github.com/discordjs/discord.js).

- Includes Dashboard
- Very Optimized
- Very Usefull

```js
/*
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 */
```

## Links

- [LICENSE](https://github.com/Synix-Studios/SynixIA/blob/main/LICENSE.rst)
- [SetUp](#quick-links)

## Requieriments

- **Node.js 16.9.0 or higher is required.**
- **Discord.js v14**

## Installation

> Note: **Installing All Packages In [Requieriments](#requieriments) Is Required**

- Open the terminal and run the following commands

```sh-session
git clone https://github.com/Synix-Studios/SynixIA
cd SynixIA
npm install
```

- Wait for all the dependencies to be installed
- Fill THe [config.js](#configjs) File
- Type `npm run start` or `npm run dev` to start the bot

## Config.js

```js
/*
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 * NOTE: BEFORE USING THE CODE YOU SHOULD READ THIS ISSUE https://github.com/Synix-Studios/SynixIA/issues/2
 */
module.exports = {
  main: {
    _bot: {
      _token: "", // bot token
      _id: "", // bot id
      _clientSecret: "", // bot clientSecret
    },
    _development: {
      _isEnabled: false, // is in development?
      _users: {
        developers: [], // developers
        allowed: [], // allowed
      },
    },
    _default: {
      _lang: {
        user: "en_U", // default user lang
        guild: "en_U", // default guild lang
      },
      _prefix: `.`, // default bot prefix
    },
    _keys: {
      // Encrypting Datas Keys
      _default: {
        key: "",
      },
    },
  },
  profile: {
    _status: {
      /* Types: online, idle, invisible, dnd ~ DEFAULT: online*/
      type: `idle`, // Discord Status
    },
    _rcp: {
      /**
       * 1 ActivityType.Playing
       * 2 ActivityType.Listening
       * 3 ActivityType.Watching
       */
      type: 2, // Type Of Activity In Enum Code
      timeout: `5`, // Timeout Changing Message
      _version: `| v1.3.5 Pre-ALPHA`, // Static
      _messages: [
        // Variable
        `In {guilds} Servers`,
        `With {users} Users`,
        `{prefix}help`,
        "I Am Currently Updating To .14!",
      ],
    },
  },
  database: {
    /* Data Base URI (MONGODB) Changing To Other DB In Future*/
    _authURI: "",
  },
  dashboard: {
    _enabled: true /* Enable/Disable Dashboard ~ DEFAULT: false */,
    _ports: {
      /* Some Ports For Dashboard ~ DEFAULT: 80, 90 */
      0: 80,
      1: 90,
      2: 3000,
    },
    _auth: {
      redirectURI: "",
    },
  },
  embeds: {
    _colors: {
      default: `0x2f3136`,
      blurple: `0x5865F2`,
      success: `0x57F287`,
      warn: `0xFEE75C`,
      error: `0xED4245`,
    },
  },
  webhook: {
    _discord: {
      error: {
        id: "",
        token: "",
      },
      warn: {
        id: "",
        token: "",
      },
      ratelimit: {
        id: "",
        token: "",
      },
    },
  },
};
```
