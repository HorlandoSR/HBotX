const discord = require("discord.js");
const config = require("./config.json");
const prefix = config.prefix;
const channelLogs = config.logs;
const { get } = require("snekfetch");
const canvacord = require("canvacord");
const Client = new discord.Client();
require("discord-buttons")(Client);
require('dotenv').config()

//UPTIME ROBOT (WEB)
const express = require('express');
const http = require('http');
const app = express();
const db = require('quick.db');

app.get("/", (request, response) => {
  
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 2800);
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.status(200).send("OK");
});
Client.on("ready", async () => {
  const a = `+help`
  const b = `version 2`
  const c = `bit.ly/HBotServer`

  status = [a, b, c];
  setInterval(() => {
    Client.user.setPresence({
      activity: {
        name: status[Math.floor(Math.random() * status.length)],
        type: 'PLAYING'
      },
      status: 'idle'
    })
  }, 5000);
  console.log(`${Client.user.username} is ready Created by Horlando ✘`);
});

Client.on("message", async message => { 
  
  if(message.channel.type == "dm")return; // If Someone using your bot in dm, thats will return it
  if(message.author.bot)return; // If Someone using your bot, but they are bots, thats will return it
  let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = default_prefix;
  if(message.content === `<@${Client.user.id}>` || message.content === `<@!${Client.user.id}>`){
    message.channel.send(`${message.author} My Prefix is ${prefix}`);
  }
  
  if(!message.content.startsWith(prefix))return; // If Someone sending a message but the message is not starts with your bot prefix, thats will return it
   
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  if(!cmd)return;
  
  try{
    const commandsFile = require(`./commands/${cmd}.js`);
    commandsFile.run(Client, message, args);
  }catch(e){
    console.log(e);
  }finally{
    Client.channels.cache.get(channelLogs).send(`${message.author.tag} Using Commands: ${cmd}, In Server: ${message.guild.name}`);
  }
})

Client.on("message", async message => {
  if(message.content.startsWith(`rank`)) {
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
    const rankcard = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#a81d16", "COLOR")
        .setOverlay("#000000")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("COLOR", "#808080")
        rankcard.build()
        .then(data => {
            const atta = new discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }

    function xp(message) {
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Congrats ${message.author}, you leveled up, you are now level ${newLevel}`)
        }
    }
  if (message.content === "balance") {
    let balance = await db.get(`balance_${message.author.id}`)
    let bank = await db.get(`bank_${message.author.id}`)
    
    if (balance === null) balance = 0
    if (bank === null) bank = 0
    let moneyEmbed = new discord.MessageEmbed()
      .setTitle(`Halo ${message.author.username}🖐️`)
      .setDescription(`Balance: ${balance}$ \nBank: ${bank}$`)
      .setColor("BLUE")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(moneyEmbed)
  }
  if (message.content.toLowerCase().startsWith("daily")) {
    const check = await db.get(`dailyCheck_${message.author.id}`)
    const timeout = 86400000;
    if (check !== null && timeout - (Date.now() - check) > 0) {
      const ms = require("pretty-ms")
      const timeLeft = ms(timeout - (Date.now() - check))
      message.channel.send(`You Have Alredy Claimed Your Daily Prize, Comeback After ${timeLeft}`)
    } else {
      let reward = 1000;
      let currentBalance = await db.get(`balance_${message.author.id}`)
      message.channel.send(`You Claimed ${reward.toLocaleString()}$ As Your Daily Reward! Comeback Tomorrow!`)
      await db.set(`balance_${message.author.id}`, currentBalance + reward)
      await db.set(`dailyCheck_${message.author.id}`, Date.now())
    }
  }
});

Client.on("message", message => {
  if(message.content === "p") {
    return message.channel.send("Atheis Lu Yak?")
  }
})

Client.on("message", message => {
  if(message.content === "sok asik lu") {
    return message.channel.send("dih, lu yang sok asik badut")
  }
})

Client.on("message", message => {
  if(message.content === "gak tau") {
    return message.channel.send("YNTKTS")
  }
})

Client.on("guildMemberAdd", async member => {
  if(member.guild.id !== "896004082467209226");
  const welcomeCard = new canvacord.Welcomer()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#03fce8")
  .setColor("username-box", "#fcf803")
  .setColor("discriminator-box", "#000000")
  .setColor("message-box", "#00ff6a")
  .setColor("border", "#ff6f00")
  .setColor("avatar", "#ff6f00")
  .setBackground("https://static.vecteezy.com/system/resources/previews/000/622/344/non_2x/beautiful-background-of-lines-with-gradients-vector.jpg")
  .setMemberCount(member.guild.membersCount)
  let attachment = new discord.MessageAttachment(await welcomeCard.build(), "welcome.png")
  member.guild.channels.cache.get("895998758834298931").send(member.user.toString(), attachment)
})

Client.on("guildMemberRemove", async member => {
  if(member.guild.id !== "896004082467209226");
  const welcomeCard = new canvacord.Leaver()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#03fce8")
  .setColor("username-box", "#fcf803")
  .setColor("discriminator-box", "#000000")
  .setColor("message-box", "#00ff6a")
  .setColor("border", "#ff6f00")
  .setColor("avatar", "#ff6f00")
  .setBackground("https://static.vecteezy.com/system/resources/previews/000/622/344/non_2x/beautiful-background-of-lines-with-gradients-vector.jpg")
  .setMemberCount(member.guild.membersCount)
  let attachment = new discord.MessageAttachment(await welcomeCard.build(), "bye.png")
  member.guild.channels.cache.get("895998758834298931").send(member.user.toString(), attachment)
})

Client.login("");
