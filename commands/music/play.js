const commando = require('discord.js-commando');
const YTDL = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube('AIzaSyBFsji6WzrmBweIlN5xz0z3uUWjOrO_0uo');

var servers = require("./servers.json");

// play loop
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0]), {filter: "audioonly"});

    server.playing = server.queue[0];
    server.queue.shift();

    server.dispatcher.on("end", function(){
        if(server.queue[0]) play(connection, message);
        else {
            connection.disconnect();
        }
    });
}

class PlayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'adds a song to the queue\ncan play youtube urls, playlists, or searches on youtube',
        });
        
    }

    async run(message, args) {
        
        // user not in voice channel
        if(!message.member.voiceChannel){
            message.channel.send("get in a voice channel to play music");
            return;
        }

        // no song argument
        if(!args[1]){
            message.channel.send("play what?\nyou can give me a youtube/playlist url or something to search on youtube");
            return;
        }

        // if the server doesn't have a queue, make one
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

        var server = servers[message.guild.id];

        // if args isn't youtube url, search it and play the first match
        if(!args.includes("youtube.com/")){
            //message.channel.send("I can only handle youtube links right now, sorry D:");

            var results = await youtube.searchVideos(args, 4)
            message.channel.send("Adding this to queue " + results[0].url);
            server.queue.push(results[0].url);
        }
        
        // youtube playlist
        if(args.includes("list=") && !args.includes("watch?v=")){

                var playlist = await youtube.getPlaylist(args);
                message.channel.send(`${playlist.title} added to the queue!`);
                var videos = await playlist.getVideos();

                // adds the vids to queue
                for(var vidindex = 0; vidindex < videos.length; vidindex++) {
                    var url = videos[vidindex].url
                    server.queue.push(url);
                }
        }

        // normal youtube url
        if(args.includes("youtube.com/") && args.includes("watch?v=")) {
            if(server.dispatcher) {
                message.channel.send("I'll add that to the queue!");
            }
        
            server.queue.push(args);
        }
    
        // bot not in channel, so it joins and plays
        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
            console.log("entered " + message.channel.name)
            message.channel.send("coming right up!");
            play(connection, message);
            return;
        }).catch(console.log);
    } 
}

module.exports = PlayCommand;