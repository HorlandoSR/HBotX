const discord = require('discord.js')

module.exports = {
      run: async (client, msg, args) => {
        
  let embed = new discord.MessageEmbed()
  .setTitle(`Author`)
  .setColor("BLUE")
  .setDescription("HaykalPRO (Horlando ✘#6377)")
  .addField('Link Invite Bot', 'https://bit.ly/haykalbot')
  .addField('Link Donate', 'https://saweria.co/HorlandoSRG')
  .addField('Link Server', 'https://discord.gg/j4XMjQ26')

  msg.channel.send(embed);
       }
}