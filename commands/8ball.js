const Discord = require("discord.js");

exports.run = async (bot, message, args, customisation) => {
    if(!args[0]) return message.reply("Please ask a full question");
    let replies = [
        'Mungkin.',
	    'Tentu Tidak.',
	    'Saya berharap begitu.',
	    'Tidak dalam mimpi terliarmu.',
    	'Ada peluang bagus.',
	    'Sepertinya.',
    	'Aku pikir begitu.',
    	'Saya harap tidak.',
    	'Saya berharap begitu.',
    	'Tidak pernah!',
    	'Pfft.',
	    'Maaf, bang.',
    	'Yeah.',
    	'Masa depan suram.',
	    'Masa depan tidak pasti.',
	    'Saya lebih suka tidak mengatakannya.',
    	'Siapa Peduli?',
    	'Mungkin.',
    	'Tidak pernah, tidak pernah.',
    	'Ada peluang kecil.',
    	'Ya!',
    	'lol Tidak.',
    	'Ada kemungkinan tinggi.',
    	'Apa bedanya?',
    	'Bukan masalah saya.',
        'Tanya Orang Lain.'
    ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let embed = new Discord.MessageEmbed()
    .setTitle("MAGIC 8 BALL!!!")
    .setColor("#AA9900")
    .addField("Q:", question)
    .addField("A:", replies[result])
    .setFooter(`Create By HorlandoSR`);

    message.channel.send({embed});
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: '8ball',
    description: 'Ask the bot a Question.',
    usage: '8ball (question)',
    category: "Fun"
  };
  