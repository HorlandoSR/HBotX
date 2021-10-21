module.exports = {
 name: "purge",
 description: "For clear some message you want!!",
 usage: "purge <amount>",
 aliases: ["clear", "clearmessage"],
run: async (client, message, args) => {

 if(!message.member.hasPermission("ADMINISTRATOR")) {
 return message.reply("You didn't has permission to use this purge command!");
 }
    
 if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
 return message.reply("I'm didn't has permission to purge some message!");
 }
 
 const amount = args.join(" ");
 if(!args[0]) return message.reply("Please specify a number of messages to delete ranging from 1 - 100");
 if(isNaN(args[0])) return message.reply("Numbers are only allowed");
 if(parseInt(args[0]) > 100) return message.reply("The max amount of messages that I can delete is 100");
 await message.channel.bulkDelete(parseInt(args[0])).catch(error => message.channel.send(`Couldn't delete the specified number of messages because of **${error}**.`));
 
  }
};