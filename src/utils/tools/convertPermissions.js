module.exports = function nicerPermission(num) {
    let permission = {
        "1": "Create Instant Invite",
        "2": "Kick Members",
        "4": "Ban Members",
        "8": "Administrator",
        "16": "Manage Channels",
        "32": "Manage Guilds",
        "64": "Add Reactions",
        "128": "View Audit Log",
        "256": "Priority Speaker",
        "512": "Stream",
        "1024": "View Channel",
        "2048": "Send Messages",
        "4096": "Send TTS Messages",
        "8192": "Manage Messages",
        "16384": "Embed Links",
        "32768": "Atach Files",
        "65536": "Read Message History",
        "131072": "Mention Everyone",
        "262144": "Use External Emoji",
        "524288": "View Guild Insights",
        "1048576": "Conect",
        "2097152": "Speak",
        "4194304": "Mute Members",
        "8388608": "Deafen Members",
        "33554432": "Use VAD",
        "67108864": "Change Nickname",
        "134217728": "Manage Nickname",
        "268435456": "Manage Roles",
        "536870912": "Manage Webhooks",
        "1073741824": "Manage Emojis & Stickers",
        "2147483648": "Use Slash Commands",
        "4294967296": "Request To Speak",
        "8589934592": "Manage Events",
        "17179869184": "Manage Threads",
        "34359738368": "Create Public Threads",
        "68719476736": "Create Private Threads",
        "137438953472": "Use External Emojis",
        "274877906944": "Send Message In Threads",
        "549755813888": "Use Embedded Activities",
        "1099511627776": "Moderate Members"
    }
    return permission[num];
}