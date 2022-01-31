const Discord = require('discord.js');

module.exports = {
  name: "loop", 
  alias: [], 

execute (client, message, args){

  const queue = client.distube.getQueue(message)

  if(!message.member.voice.channel) return message.channel.send ("debes estar en un canal de voz")

  if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo")

  if(!queue) return message.channel.send("no hay canciones reproduciendose")
  const opcion = args[0]
  if(!opcion) return message.channel.send("debes escribir una opcion (0 / 1 / 2)")

  if(opcion !== '0'){
    if(opcion !== '1'){
      if(opcion !== '2'){
       return message.channel.send("eso no es una opcion valida.")
      }
    }
  }
 
 if(opcion === '0'){
    client.distube.setRepeatMode(message, 0)
    message.channel.send("La repeticion a sido desactivada")
    return;
 }
  if(opcion === '1'){
    client.distube.setRepeatMode(message, 1)
    message.channel.send("se a activado la repeticion de la cancion actual")
    return;
 }
  if(opcion === '2'){
    client.distube.setRepeatMode(message, 2)
    message.channel.send("se a activado la repeticion de la playlist")
    return;
 }

 }

} 