const commando = require('discord.js-commando');
const YTDL = require("ytdl-core");

const bot = new commando.Client({
    commandPrefix: '^'
});

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login('NDQ2MDQ5MDk5NDQwMDYyNDY0.DdzXdw.fq_wS8016y0iDXGsweV5KlgPmaI');