exports.run = async(client, message, args) => {
  let say = args.join(' ')
  message.channel.send(say)
}