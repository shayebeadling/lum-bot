const commando = require('discord.js-commando');
const YTDL = require("ytdl-core");
var servers = require("./servers.json");

class QueueCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'shows the current queue',
        });
    }

    run(message, args) {
        
        var server = servers[message.guild.id];

        if(server && !server.queue[0]){
            message.channel.send("nothing queued!");
            return;
        }
        if(server && server.queue[0]){
            message.channel.send("sorry if this is messy! this format is only temporary!");
            for(var j = 0;  j < 5 && j < server.queue.length; j++){
                message.channel.send(server.queue[j]);
            }
            if(server.queue.length > 5){
                message.channel.send("and like " + (server.queue.length - 5) + " other songs");
            }
            return;
        }
    }
}

module.exports = QueueCommand;