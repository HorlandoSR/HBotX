const discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
  name: "weather",
  description: "get some city weather forecast / information",
  usage: "",
  aliases: [],
  permission: [],
  cooldown: 3000,
  run: async (client, message, args) => {
    
    let city = args.join(" ");
    if (!city) {
      return message.channel.send("Please Provide Some City Will You Find")
    }
    
    weather.find({ search: city, degreType: "F"}, (error, result) => {
      
      if (error) return message.channel.send("Something Went Wrong!");
      else if (result.length === 0) {
        return message.channel.send("Your City Provided Is not Found!");
      }
      
      let data = result[0];
      let time = `${data.current.date}, ${data.current.observationtime}`
      const embed = new discord.MessageEmbed()
      .setAuthor("Weather Forecast", data.current.imageUrl)
      .setColor("BLUE")
      .setThumbnail(data.current.imageURL)
      .addField("City", data.location.name, true)
      .addField("Sky Condition", data.current.skytext, true)
      .addField("Temperature", data.current.temperature, true)
      .addField("Wind Speed", data.current.windspeed, true)
      .addField("Timezone", data.location.timezone, true)
      .addField("Day", data.current.day, true)
      .setFooter(time)
      
      return message.channel.send(embed);
    })
  }
}