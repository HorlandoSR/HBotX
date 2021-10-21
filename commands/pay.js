const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    }

    let balance = db.get(`balance_${message.author.id}`);

    if (!user) return message.channel.send("Please mention the user or input the user ID.");
    if (user.bot || user === client.user) return message.channel.send("This user is a bot.");
    if (user.id === message.author.id || user === message.author) return message.channel.send("Why you want to transfer a credit to yourself?");

    let amount = parseInt(args[1]);
    if (!amount) return message.channel.send("Please input a credits that you want to transfer it.");
    if (isNaN(amount)) return message.channel.send("Please input a valid number.");
    // isNaN = is Not a Number.

    if (!balance || balance == 0) return message.channel.send("Your wallet is empty.");
    if (amount > balance) return message.channel.send("You don't have an enough credits to transfer. That is way too much.");
    if (amount === 0) return message.channel.send("You transfer, nothing? No. You cannot.");

    await db.add(`balance.${user.id}`, amount);
    await db.subtract(`balance_${message.author.id}`, amount);

    return message.channel.send(`You've been transferred to your friends (${user.tag}) $${amount} credits!`);
}

exports.help = {
    name: "pay",
    description: "Transfer a credits to the user.",
    usage: "pay <@user | user ID> <amount>",
    example: "pay Horlando ✘#6377 1000"
}

exports.conf = {
    aliases: ["pay"],
    cooldown: 15
}
