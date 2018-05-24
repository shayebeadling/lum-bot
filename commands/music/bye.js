const commando = require('discord.js-commando');
const YTDL = require("ytdl-core");
var servers = require("./servers.json");

class ByeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'bye',
            group: 'music',
            memberName: 'bye',
            description: 'makes Lum leave the voice channel',
        });
    }

    run(message, args) {

        var server = servers[message.guild.id];

        message.channel.send("bye!");

        server.queue = [];
        message.member.voiceChannel.leave();
    }
}

module.exports = ByeCommand;