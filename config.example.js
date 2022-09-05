module.exports = {
    main: {
        _bot: {
            _token: '', // bot token
            _id: '', // bot id
            _clientSecret: '' // bot client secret
        },
        _development: {
            _isEnabled: false, // is in development?
            _users: {
                developers: [], // developers
                allowed: [] // allowed
            }
        },
        _default: {
            _lang: {
                user: 'en_US', // default user lang
                guild: 'en_US' // default guild lang
            },
            _prefix: '.' // default user prefix
        },
        _encrypt: {
            _default: {
                key: '' // random key for encryption
            },
            /* All Saved Data Keys */
            _database: {
                key: '' // random key for database encryption
            },
        }
    },
    profile: {
        _status: {
            /* Types: online, idle, invisible, dnd ~ DEFAULT: online*/
            type: 'idle' // Discord Status 
        },
        _rcp: {
            /**
             * 1 ActivityType.Playing
             * 2 ActivityType.Listening
             * 3 ActivityType.Watching
             */
            type: 2,
            timeout: '5',
            _version: '| v0.0.1 Pre-ALPHA',
            _messages: [
                'In {guilds} Servers',
                'With {users} Users',
                '{prefix}help',
                'I Am Currently Updating To .14!'
            ]
        }
    },
    database: {
        /* DataBase Auth URI */
        _authURI: ''
    },
    dashboard: {
        _enabled: true,
        _ports: {
            0: 80,
        },
        _auth: {
            redirectURI: ''
        }
    },
    embeds: {
        _colors: {
            default: '0x2f3136',
            blurple: '0x5865F2',
            success: '0x57F287',
            warn: '0xFEE75C',
            error: '0xED4245'
        }
    },
    webhook: {
        _discord: {
            error: {
                id: '',
                token: ''
            },
            warn: {
                id: '',
                token: ''
            }
        }
    }
}