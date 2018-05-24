const commando = require('discord.js-commando');
const YTDL = require("ytdl-core");
var servers = require("./servers.json");

class NpCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'np',
            group: 'music',
            memberName: 'np',
            description: 'shows the current song',
        });
    }

    run(message, args) {
        
        var server = servers[message.guild.id];

        if(!server.dispatcher){
            message.channel.send("nothing queued!");
            return;
        }
        else{
            message.channel.send("currently playing " + server.playing);
            return;
        }
    }
}

module.exports = NpCommand;