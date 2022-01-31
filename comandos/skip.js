const Discord = require('discord.js');
const distube = require('distube')

module.exports = {
  name: "skip", 
  alias: ["saltar"], 

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
  .setTitle("❌Debes Estar En Un Canal De Voz!")
  .setTimestamp()
  .setColor("RED")

  const embed1 = new Discord.MessageEmbed()
  .setTitle("❌Debes Estar En El Mismo Canal De Voz Que Yo!")
  .setTimestamp()
  .setColor("RED")

  const embed2 = new Discord.MessageEmbed()
  .setTitle("❌No Hay Canciones Reproduciendose!")
  .setTimestamp()
  .setColor("RED")

  const embed3= new Discord.MessageEmbed()
  .setTitle("La Cancion Fue Saltada Con Exito!")
  .setTimestamp()
  .setColor("GREEN")

  const queue = client.distube.getQueue(message)

  if(!message.member.voice.channel) return message.channel.send(embed)

  if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed1)

  if(!queue) return message.channel.send(embed2)

  client.distube.skip(message)
  message.channel.send(embed3)

 }

} 