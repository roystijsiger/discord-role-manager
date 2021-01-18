require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if(msg.content.startsWith('!russianRoulette')){
      msg.channel.send("Lets see whose gonna die.")
      const list = bot.guilds.get("706146210876096645");

      setTimeout(() => {
        msg.channel.send("1...")
      }, 1000);

      setTimeout(() => {
        msg.channel.send("2...")
      }, 2000);

      setTimeout(() => {
        msg.channel.send("3...")
      }, 3000);

      setTimeout(()=> {
        //msg.channel.send(`${list.members.random().nickname} haha you're dead :D`);
        let members = Array.from(list.members);
        let randomMember = members[Math.floor(Math.random() * members.length)];
        msg.channel.send(`Hihihihi ${randomMember[1].nickname} you're dead :D piew piew.`);
        
      }, 4000)

    
  }

  if(msg.content.startsWith('!alive')){
    msg.channel.send("Yes im alive what about you :D?");
  }

  if(msg.content.startsWith('!checkPerms')){
    var allowedToRunCommand= ['Chief Admin'];
    console.log(msg.member.highestRole);
    if(msg.member.highestRole.name !== "Chief Admin" && msg.member.highestRole.name !== "Kolonel - Senior Admin"){
      msg.channel.send("You dont have permissions to run this command");
    }
    else{
      msg.channel.send("I'll start looping through the members now... :)");
      const list = bot.guilds.get("706146210876096645");
      var giveawayRole = bot.guilds.get("706146210876096645").roles.find(role => role.name === "Giveaways");
  
      list.members.forEach(member => {
        var allowedGiveaways = ['Kolonel - Senior Admin','Chief Admin','Sherpa','Luitenant','Sergeant','Korporaal'];
        allowedGiveaways.forEach(value => {
          if(member.highestRole.name === value){
            found = true;
            msg.channel.send(`Added perm giveaways to ${member.nickname}`);
            member.addRole(giveawayRole).then((response)=>{
              console.log(response)
            }).catch(e => {
              console.log(e)
            });
          }
  
        })
  
        if(!found){
          msg.channel.send(`Removed perm giveaways from ${member.nickname}`);
          member.removeRole(giveawayRole)
        }
      })

      msg.channel.send("I'm done checking permissions. :)");
    }



    
  }
});

bot.on('guildMemberUpdate', (oldMember, newMember) =>{
  
  const userLogsChannel = bot.channels.find(c => c.name === "user-logs");
  var soldaatRole = newMember.guild.roles.find(role => role.name === "Soldaat");
  if(oldMember.nickname !== newMember.nickname){
    //todo: LETS ADD A REGEX TO SEE IF SOMEONE CHANGED HIS NAME ACCORDING To (NAME) NICKNAME :) POG
    var regex = /\([a-zA-Z]+\) [a-zA-Z]+/;
    var correctNickname = regex.test(newMember.nickname);
    if(correctNickname){
      userLogsChannel.send(`${oldMember.nickname} has changed his name to ${newMember.nickname} and has now received the "Soldaat" role.`)
      newMember.addRole(soldaatRole);
    }
    else{
      userLogsChannel.send(`${oldMember.nickname} has changed his name to ${newMember.nickname} and has now lost the "Soldaat" role. Changed his name to something thats not valid.`)
      newMember.removeRole(soldaatRole);
    }
  }

  
  var allowedGiveaways = ['Kolonel - Senior Admin','Chief Admin','Sherpa','Luitenant','Sergeant','Korporaal'];
  //check if its in one of the allowed gievaways
  var found = false;

  
  var giveawayRole = newMember.guild.roles.find(role => role.name === "Giveaways");

  allowedGiveaways.forEach(value => {
    if(newMember.highestRole.name === value){
      found = true;
      //if giveaways role isnt found add it.
      if(!newMember.roles.find(r => r.name =="Giveaways")){
        newMember.addRole(giveawayRole);
      }
      userLogsChannel.send(`${newMember.nickname} has received the giveaway role.`);
    }
  })

  if(!found){
    //if giveaways role is found
    if(newMember.roles.find(r => r.name =="Giveaways")){
      newMember.removeRole(giveawayRole);
    }
    userLogsChannel.send(`${newMember.nickname} has lost the giveaway role.`);
  }
})

bot.on("guildMemberAdd", function(member){
  console.log(`a user joins a guild: ${member.tag}`);
});