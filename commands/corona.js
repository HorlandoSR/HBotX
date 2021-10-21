const discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "corona",
  description: "Get the stats of corona",
  usage: "corona all or corona <country>",
  aliases: ["covid", "covid19"],
  run: async(client, message, args) => {
    
    if(!args.length) {
      return message.reply('Please type `!corona all` or `!corona <country>`');
    };
    
    const embed = new discord.MessageEmbed()
    .setDescription(`Wait a sec I will search your request!!`)
    .setColor('YELLOW');
    let msg = await message.channel.send(embed).then(m => m.delete({timeout: 5000}));
    
    if(!args[0] || args[0].toLowerCase() === "all" || args[0].toLowerCase() === "global") {
      try {
        let corona = await fetch("https://disease.sh/v3/covid-19/all");
        corona = await corona.json();
        
        let embed1 = new discord.MessageEmbed()
      .setTitle("**Global Cases**")
      .setColor("RANDOM")
      .setDescription(`Ini adalah hasil corona dari seluruh dunia:`)
      .addField('Population:', corona.population.toLocaleString(), true)
      .addField('Total Cases:', corona.cases.toLocaleString(), true)
      .addField('Today Active:', corona.active.toLocaleString(), true)
      .addField('Total Deaths:', corona.deaths.toLocaleString(), true)
      .addField('Total Recovered:', corona.recovered.toLocaleString(), true)
      .addField('Today Cases:', corona.todayCases.toLocaleString(), true)
      .addField('Today Deaths:', corona.todayDeaths.toLocaleString(), true)
      .addField('Total Critical:', corona.critical.toLocaleString(), true)
      return msg.channel.send(embed1);
      } catch(err) {
        msg.channel.send({embed: {
          "description": "Something went wrong :(",
          "color": "RED"
        }
         });
      };
      
    } else {
      
      try {
        let corona = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`);
        corona = await corona.json();
        
        let embed2 = new discord.MessageEmbed()
        .setAuthor(corona.country.toUpperCase(), corona.countryInfo.flag || "")
        .setColor("RANDOM")
        .setThumbnail(corona.countryInfo.flag || "")
        .setDescription(`Ini adalah hasil corona dari country **__${args.join(" ")}__**:`)
        .addField('Population:', corona.population.toLocaleString(), true)
        .addField('Total Cases:', corona.cases.toLocaleString(), true)
        .addField('Today Active:', corona.active.toLocaleString(), true)
        .addField('Total Deaths:', corona.deaths.toLocaleString(), true)
        .addField('Total Recovered:', corona.recovered.toLocaleString(), true)
        .addField('Today Cases:', corona.todayCases.toLocaleString(), true)
        .addField('Today Deaths:', corona.todayDeaths.toLocaleString(), true)
        .addField('Total Critical:', corona.critical.toLocaleString(), true);
        return msg.channel.send(embed2);
      } catch(err) {
        msg.channel.send({embed: {
          "description": "Unable to find the Information related to given country!",
          "color": "RED"
        }
          })
      }
      
    }
  }
}