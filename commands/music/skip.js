const commando = require('discord.js-commando');
const YTDL = require("ytdl-core");
var servers = require("./servers.json");

class SkipCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'skips a song',
        });
    }

    run(message, args) {
        
        var server = servers[message.guild.id];

        if(server.dispatcher){
            message.channel.send("skipping current song!");
            server.dispatcher.end();
            return;
        }
    }
}

module.exports = SkipCommand;