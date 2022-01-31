const Discord = require('discord.js');

module.exports = {
  name: "stop", 
  alias: [], 

execute (client, message, args){

  const serverQueue = client.distube.getQueue(message)
   
  const embed = new Discord.MessageEmbed()
  .setTitle("Musica Detenida Correctamente")
  .setTimestamp()
  .setColor("GREEN")

  const embed1 = new Discord.MessageEmbed()
  .setTitle("❌Debes estar en un canal de voz")
  .setTimestamp()
  .setColor("RED")

  const embed2 = new Discord.MessageEmbed()
  .setTitle("❌Debes estar en el mismo canal de voz que yo")
  .setTimestamp()
  .setColor("RED")

  const embed3 = new Discord.MessageEmbed()
  .setTitle("❌No hay canciones en la lista de reproduccion")
  .setTimestamp()
  .setColor("RED")

  if(!message.member.voice.channel) return message.channel.send(embed1)

  if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed2)

  if(!serverQueue) return message.channel.send(embed3)

  client.distube.stop(message)
  
  message.channel.send(embed)

 }

} 