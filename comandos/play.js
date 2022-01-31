const Discord = require('discord.js');
const distube = require('distube')

module.exports = {
  name: "play", 
  alias: [], 

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
  .setTitle("❌Debes Escribir una cancion para buscar")
  .setTimestamp()
  .setColor("RED")
  
  const embed1 = new Discord.MessageEmbed()
  .setTitle("❌Debes estar en un canal de voz")
  .setTimestamp()
  .setColor("RED")

  const embed2 = new Discord.MessageEmbed()
  .setTitle("❌Debes estar en el mismo canal de voz que yo")
  .setTimestamp()
  .setColor("RED")

  const cancion = args.join(" ")
  if(!cancion) return message.channel.send(embed)

  if(!message.member.voice.channel) return message.channel.send(embed1)

  if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed2)

  client.distube.play(message, cancion)

 }

} 