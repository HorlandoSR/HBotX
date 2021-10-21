const discord = require("discord.js");
const reddit  = require("reddit-scrapper")

module.exports = {
  name: "memes",
  description: "Memes Form Reddit",
  category: "general",
  usage: "[prefix]memes",
  cooldown: 5500,
  aliases: ["meme", "reddit"],
  run: async (client, message, args) => {
    
    let listMeme   = ["meme", "memes", "dankmemes"]
    let searchMeme = listMeme[Math.floor(Math.random() * listMeme.length)]
    let memeData   = (await reddit({search: searchMeme})).data.filter((data) => data.nsfw !== true)
    let meme       = memeData[Math.floor(Math.random() * memeData.length)]
    
    let title   = meme.title
    let image   = meme.image
    let link    = meme.link
    let author  = meme.author
    let like    = meme.like
    let dislike = meme.dislike
    let comment = meme.comment
    
    if(!image || image === ""){
      return message.channel.send("Image Error, pls try again")
    }
    
    const memeEmbed = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(title)
    .setURL(link)
    .setDescription(`\n**Author:** ${author}\n`)
    .setImage(image)
    .setFooter(`👍: ${like} | 👎: ${dislike} | 💬: ${comment}`)
    return message.channel.send(memeEmbed)
  }
};