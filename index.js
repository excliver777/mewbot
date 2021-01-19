  
const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')

client.on('ready', () => {
  console.log('The client is ready!')
  client.user.setPresence({ activity: { name: ".냐옹이도움 을 치거라 냥"}, status: "online" })
  welcome(client)
})

  command(client,'ping', (message) => {
    message.channel.send(`🏓\`${Date.now() -    message.createdTimestamp}\`ms 입니다!`);
})
   command(client, '서버', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} 는 ${guild.memberCount} 명의 멤버가 있으시네요 앗싸 :smile:`
      )
    })
  })
  command(client, '추방', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} 추방됨 흐흐 냥이지가 한건했군`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} 권한없음 ㅅㄱ`
      )
    }
  })

  command(client, '차단', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} 추방됨`)
      } else {
        message.channel.send(`${tag} 추방 실패`)
      }
    } else {
      message.channel.send(
        `${tag} 권한 없음.`
      )
    }
  })
 command(client, '냐옹이도움', (message) => {
  let helpImg = "https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png"
    let commandList = [
      { name: "ping", desc: "현재 핑 상태" },
      { name: "추방", desc: "멤버를 추방합니다" },
      { name: "차단", desc: "멤버를 차단합니다" },
      { name: "서버", desc: "서버의 인원수를 확인합니다." },
      { name: "준비중", desc: "준비중입니다" },
      { name: "준비중", desc: "준비중입니다" },
      { name: "준비중", desc: "준비중입니다" },
      { name: "준비중", desc: "준비중입니다" },
    ]
    let commandStr = ""
    let embed = new Discord.MessageEmbed().setAuthor("Help of 콜라곰 BOT", helpImg).setColor("#186de6").setFooter(`냥이지bot❤️`).setTimestamp()

    commandList.forEach((x) => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`
    })
    
    embed.addField("Commands: ", commandStr)

    message.channel.send(embed)
  })
  command(client,'동의합니다', (message) => {
    message.member.roles.add("800728464163602462");
    let embed = new Discord.MessageEmbed()
    .setDescription(`${message.author.username} 님 동의하셨습니다.`)
    .setFooter(`${message.author.username} 님 은 규칙 을 읽어주세요`)
    .setTimestamp()
    message.channel.send(embed)
  })
  function changeCommandStringLength(str, limitLen = 8) {
    let tmp = str
    limitLen -= tmp.length
  
    for (let i = 0; i < limitLen; i++) {
      tmp += " "
    }
  
    return tmp
  }
  
client.login(config.token);