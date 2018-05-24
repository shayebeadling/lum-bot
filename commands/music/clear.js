const commando = require('discord.js-commando');
const YTDL = require("ytdl-core");
var servers = require("./servers.json");

class ClearCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'music',
            memberName: 'clear',
            description: 'clears the queue',
        });
    }

    run(message, args) {
        
        var server = servers[message.guild.id];

        server.queue = [];
        message.channel.send("the queue has been cleared!");
    }
}

module.exports = ClearCommand;