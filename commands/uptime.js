const ms = require("pretty-ms")
const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {
  const uptime = ms(client.uptime, {verbose:true})
  const embed = new MessageEmbed()
  .addField("Bot Uptime", uptime)
  .setColor("RANDOM")
  
  message.channel.send(embed)
}