const discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wiki",
  aliases: ["wikipedia"],
  run: async (client, message, args) => {
    const body = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        args.join(" ")
      )}`
    ).then(res => res.json().catch(() => {}));
    
    if (!body) return message.channel.send("Page not found ❌");
    if (body.title && body.title === "Not found.") return message.channel.send("Error! Page Not Found... ❌");

    const embed = new discord.MessageEmbed()
      .setTitle(`🌐 ${body.title}`)
      .addField(
        "More Info",
        `**[Click Here](${body.content_urls.desktop.page})**`,
        true
      )
      .setDescription(`** ${body.extract} **`)
      .setColor("GREEN")

    if (body.thumbnail) embed.setThumbnail(body.thumbnail.source)
    message.channel.send(embed);
  }
};