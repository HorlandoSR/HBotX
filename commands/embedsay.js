const discord = require('discord.js')

module.exports = {
      run: async (client, msg, args) => {
          let embedtext = args.slice(0).join(" ")
          if(!embedtext) return msg.channel.send("Masukan kata-kata terlebih dahulu!")

           let embed = new discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(embedtext)
           msg.channel.send(embed);

       }
}