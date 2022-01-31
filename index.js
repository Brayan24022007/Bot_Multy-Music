const Discord = require('discord.js')
const client = new Discord.Client();
const { Client, MessageEmbed, Guild } = require('discord.js');
require('dotenv').config();
///////Sistema base///////

/////SISTEMA 24/7/////
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function(request, response) {
	response.sendFile(__dirname + '/comandos/index.html');
});
app.listen(3000, () => console.log(`FUNCIONAMIENTO CORRECTO`));
/////SISTEMA 24/7/////

/////Carpetas(fs)/////
const fs = require('fs')
let { readdirSync } = require('fs')
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}
/////Carpetas(fs)/////

/////Actividad del bot/////
client.on('ready', () => {
 const array = [
   {
    name: "Programando bots",
    type: "PLAYING"
   },
   {
    name: "Musica",
    type: "LISTENING"
   }
 ]
  setInterval(() => {
    function presence(){
      client.user.setPresence({
        status: "online",
        activity: array[Math.floor(Math.random() * array.length)],
      });
    }

    presence();
  }, 10000);
  console.log(`Iniciado Como ${client.user.tag}!`);
});
/////Actividad del bot/////

client.on('message', async (message) =>{
  /////Prefijo/////
  let prefix = '-'
  /////Prefijo/////
  if(message.author.bot) return;


  if(!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.author
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd){
    cmd.execute(client, message, args)
  }
})

/////Distube/////
const Distube = require('distube')
client.distube = new Distube(client, {
  emitNewSongonly: true,
  searchSongs: false,
  leaveOnStop: false,
  leaveOnFinish: false,
  leaveOnEmpty: true,
});

client.distube.on("addList", (message, queue, playlist) => message.channel.send(`playlist:\n**${playlist.name}** ***${message.author}***`)
)

client.distube.on("addSong", (message, queue, song) => message.channel.send(`***${message.author}*** Añadido a la cola, **${song.name}** - **${song.formattedDuration}** `)
)

client.distube.on("playSong", (message, queue, playsong) => message.channel.send(` ***${message.author}*** Reproduciendo ahora **${playsong.name}** - **${playsong.formattedDuration}** `)
)

client.distube.on("playList", (message, queue, playlist) => message.channel.send(`***${message.author}*** Reproduciendo playlist: **${playlist.name}**  `)
)

client.distube.on('intiQueue', (queue) => {
  queue.autoplay = false;
  queue.volume = 100
})
/////Distube/////

/////Token Del Bot/////
const mySecret = process.env['TOKEN']
client.login(mySecret)
/////Token Del Bot/////