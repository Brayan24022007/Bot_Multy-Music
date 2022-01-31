const Discord = require('discord.js');

module.exports = {
  name: "queue", 
  alias: ["q"], 

execute (client, message, args){

  const queue = client.distube.getQueue(message)

  if(!queue) return message.channel.send("no hay canciones reproduciendose ")

  const embed = new Discord.MessageEmbed()
  .setTitle("Playlist")

  .setDescription(`\n` + queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join("\n"))

  .setFooter("Playlist del sevidor")

  .setColor(`RANDOM`)

 
  message.channel.send(embed)

 }

} 