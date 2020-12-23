const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let regList = [];
client.on('message', msg => {


  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    msg.channel.send('Olá, utilize `a!list` para verificar a lista de pessoas interessadas em jogar ou `a!register` para mostrar interesse!!');
  } else if (command === 'register') {
      if(regList.includes(msg.author.username)) {
          return msg.channel.send('Você já está registrado na lista de interesse!');
      }
      msg.channel.send(`${msg.author.username} acabou de demonstrar interesse em jogar. utilize "a!leave" para sair da lista`);
      regList.push(msg.author.username);
  }

  else if (command === 'leave') {
    if(!regList.includes(msg.author.username)) {
        return msg.channel.send('Você não está registrado na lista de interesse!');
    }
    regList = regList.filter(item => item !== msg.author.username);
    msg.channel.send(`${msg.author.username} deixou a lista de interesse. utilize "a!register" caso queira retornar`);
  }

  else if (command === 'list') {
    if(regList.length === 0) {
        return msg.channel.send('A lista de interesse está vazia. Utilize `a!register` caso queira participar.')
    }
    msg.channel.send('Usuários com interesse em jogar:');
    regList.forEach(user => msg.channel.send(`${regList.indexOf(user)+1} -> ${user}`));
    console.log(`${regList} + ${msg.author.tag} + ${msg.author.avatar} + ${msg.author.id}`);
  }

  else if (command === 'mute' && msg.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) {
      msg.channel.send(`${msg.member.voice.channel.name} está mutado.`);
      msg.member.voice.channel.members.forEach((member, index) =>  setTimeout(()=>{member.voice.setMute(true)},100*index));
  } else if (command === 'unmute' && msg.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) {
      msg.channel.send(`${msg.member.voice.channel.name} está desmutado.`);
      msg.member.voice.channel.members.forEach((member, index) =>  setTimeout(()=>{member.voice.setMute(false)},100*index));
  }

  else if (command.startsWith('d')) {
    let dice = parseInt(command.substring(1)-1);
    if(!(dice===Number(dice))) {
      msg.channel.send("Por favor né, isso daí não é número, é por tipos assim que meu trabalho preventido fica difícil!");
    } else {
      msg.channel.send((Math.round(Math.random()*dice+1)));
    }
  }

});

client.login(token);