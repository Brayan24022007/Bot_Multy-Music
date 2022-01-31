const Discord = require('discord.js');
const distube = require('distube')

module.exports = {
  name: "pause", 
  alias: ["pausa"], 

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
  .setTitle("❌Debes estar en un canal de voz para usar este comando")
  .setTimestamp()
  .setColor("RED")

  const embed1 = new Discord.MessageEmbed()
  .setTitle("❌Debes estar en el mismo canal de voz que yo")
  .setTimestamp()
  .setColor("RED")

  const embed2 = new Discord.MessageEmbed()
  .setTitle("❌No hay canciones reproduciendose ahora")
  .setTimestamp()
  .setColor("RED")

  const embed3 = new Discord.MessageEmbed()
  .setTitle("❌La musica ya estaba pausada")
  .setTimestamp()
  .setColor("RED")

  const embed4 = new Discord.MessageEmbed()
  .setTitle("La Musica Se ha Pausado Correctamente!")
  .setTimestamp()
  .setColor("GREEN")

  if(!message.member.voice.channel) return message.channel.send(embed)

  if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed1)

  const serverQueue = client.distube.getQueue(message)

  if(!serverQueue) return message.channel.send(embed2)

  if(serverQueue.pause) return message.channel.send(embed3)

  client.distube.pause(message)

  message.channel.send(embed4)

 }

} 