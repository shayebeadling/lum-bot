const commando = require('discord.js-commando');

class JokeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'joke',
            group: 'random',
            memberName: 'joke',
            description: 'Tells a joke, I only know one as of right now but I swear it\'s hilarious'
        });
    }

    async run(message, args) {
        message.channel.send("What did the buffalo say when his son left?\n.....\nBison!\nI'm hilarious!");
    } 
}

module.exports = JokeCommand;