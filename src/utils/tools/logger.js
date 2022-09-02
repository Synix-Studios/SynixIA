// exporting all required packages & functions 
const fs = require('fs')
const moment = require("moment");
const Discord = require("discord.js")
/**
 * @CONFIG
*/
const dateNow = `${moment().format("DD-MM-YY ~ H:m:s")}`
const fileName = `${moment().format('DD-MM-YY')}` // file name, used to create an filename with this formatt | Default: <day>-<month>-<year> ~ <time>
const fileExtension = `.log` // file extension for fileName | Default: .log
const logPath = `./logs/` // transcripting path
const logTranscript = true// if should transcript
const logTypes = ['log', 'info', 'success', 'error', 'warn', 'event', 'debug'] // DO NOT EDIT IF DON'T KNOW WHAT IS THIS. | DEFAULT: ['log', 'info', 'success', 'error', 'warn', 'event', 'debug']
const webhookTranscript = false// if send important logs to webhook logs IMPORTANT: ONLY WORKS FOR WARN AND ERROR IF WANT OTHER LOGS BE LOGGED NEED TO EDIT THE CODE DM ME FOR HELP (^_−)−☆
const webhookTranscriptTokens = {
    error: {
        id: client.config.webhook._discord.error.id, // the webhook id
        token: client.config.webhook._discord.error.token // the webhook token
    },
    warn: {
        id: client.config.webhook._discord.warn.id, // the webhook id
        token: client.config.webhook._discord.warn.token // the webhook token
    }
}
const Colors = {
    // colors of loging text
    log: '\033[38;5;15m',
    info: '\033[38;5;214m',
    success: '\033[38;5;10m',
    error: '\033[38;5;9m',
    warn: '\033[38;5;228m',
    event: '\033[38;5;123m',
    debug: '\033[38;5;213m',

    // colors of logging timestam, type, filename, reset
    timestamp: '\u001b[34;1m',
    logType: '\u001b[34;1m',
    fileName: '\u001b[36;1m',
    // DO NOT EDIT THIS
    reset: '\u001b[0m',

    //Webhook Embed Colors
    webhook_warn: '0xFFF000', // WEBHOOK EMBED COLOR IN HEX Please Here How to Use || HEX = RED #FFF000 Cange It To 0xFFF000 Change From # To 0x
    webhook_error: '0xFF0000' // WEBHOOK EMBED COLOR IN HEX Please Here How to Use || HEX = RED #FFF000 Cange It To 0xFFF000 Change From # To 0x
} // Use ASNI Colors For This, If Know What You're Doing Fell Free Editing It.
/**
 * @END @CONFIG
*/

// Exporting All 
exports.log = async (msg, type = 'log') => {
    /**
     * @function Functions Just Making Some Functions UwU
    */
    if (!logTypes.includes(type.toLowerCase())) throw new Error("[Logger] Invalid Logging Type.") // check if logger is valid

    function _file() {
        let filename;
        let _pst = Error.prepareStackTrace;
        Error.prepareStackTrace = function (err, stack) { return stack; };
        try {
            let err = new Error();
            let callerfile;
            let currentfile;

            currentfile = err.stack.shift().getFileName();
            currentline = err.stack.shift().getLineNumber()

            while (err.stack.length) {
                callerfile = err.stack.shift().getFileName();
                if (currentfile !== callerfile) {
                    filename = callerfile;
                    break;
                }
            }
        } catch (err) { }
        Error.prepareStackTrace = _pst;

        filename = filename
            .split(/[\\/]/).pop()
        return { filename }; // return filename with []
    }

    function transcript() { // make transcript
        if (logTranscript !== true) return;
        content = `[${dateNow}] - [${type}] ~ ${_file().filename}  ${msg}`
        if (!fs.existsSync(logPath)) {
            fs.mkdirSync(logPath);
        }
        fs.writeFileSync(logPath + fileName + fileExtension, `${content}\n`, { flag: "a+" },
            (err) => {
                if (err) throw new Error("[Logger] Falied To Transcript.")
            })
    } // transcript function that transcript it to a file if set to true

    function transcriptToWebhook() {
        if (webhookTranscript !== true) return; // check if want to transcript
        if (type === "error" || type === "warn") {
            const webhook = {
                color: type === "warn" ? Colors.webhook_warn : Colors.webhook_error,
                title: type === "warn" ? `An ${type.charAt(0).toUpperCase() + type.slice(1)}ing Has Appeared!` : `An ${type.charAt(0).toUpperCase() + type.slice(1)} Has Ocurred`,
                fields: [
                    {
                        name: `Content:`,
                        value: `\`\`\`${msg}\`\`\``,
                    },
                    {
                        name: `Full:`,
                        value: `\`\`\`[${dateNow}] - [${type}] ~ [${_file().filename}]  ${msg}\`\`\``,
                    },
                ],
            } // embed maker

            const webhook_sender = new Discord.WebhookClient({
                id: type === "warn" ? webhookTranscriptTokens.warn.id : webhookTranscriptTokens.error.id,
                token: type === "warn" ? webhookTranscriptTokens.warn.token : webhookTranscriptTokens.error.token
            }); // get id, token and set

            webhook_sender.send({
                embeds: [webhook]
            }); // send it
        }
    } // transcript to webhook channel (DISCORD)

    function log_color() {
        let color;
        type === "log" ? color = Colors.log : type === "info" ? color = Colors.info : type === "success" ? color = Colors.success : type === "error" ? color = Colors.error : type === "warn" ? color = Colors.warn : type === "event" ? color = Colors.event : color = Colors.debug
        return color;
    }

    console.log(`${Colors.timestamp}[${dateNow}]${Colors.reset} - ${Colors.logType}[${type}]${Colors.reset} ~ ${Colors.fileName}[${_file().filename}]${Colors.reset} ${log_color()}${msg}${Colors.reset}`)
    transcript()
    transcriptToWebhook()
}

exports.info = (...args) => this.log(...args, 'info');
exports.success = (...args) => this.log(...args, 'success');
exports.error = (...args) => this.log(...args, 'error');
exports.warn = (...args) => this.log(...args, 'warn');
exports.event = (...args) => this.log(...args, 'event');
exports.debug = (...args) => this.log(...args, 'debug');

/**
 * @author TheJoaqun#7309 (Permanent Discord Username)
 * @licence This Code Is Free To Use Or Edit. This Code Shouldn't Be Selled, Re-Selled Or Publish It Under Other Credits
 * @version {1.0} May Be Last Update
*/