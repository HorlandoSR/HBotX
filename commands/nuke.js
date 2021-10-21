module.exports = {
name: "nuke",
description: "To clear all message on the channel",
usage: "nuke",
aliases: ["nukechannel", "clearall"],
run: async (client, message, args) => {

 if(!message.member.hasPermission("ADMINISTRATOR")) {
 return message.reply("You are not have permission to use this command!!");
 }
 
 let channel = client.channels.cache.get(message.channel.id);
 var posisi = channel.position;

 channel.clone().then((channel2) => {
 channel2.setPosition(posisi)
 channel.delete()
 channel2.send("This channel has been nuked!!").then(m => m.delete({timeout: 10000}))
 });

 }
};