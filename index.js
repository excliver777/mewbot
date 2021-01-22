  
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
    message.channel.send(`🏓\`${Date.now() -    message.createdTimestamp}\`ms 내`);
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
        message.channel.send(`${tag} error code: @ is not defined `)
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
  let helpImg = ""
    let commandList = [
      { name: "ping", desc: "현재 핑 상태" },
      { name: "관리자", desc: "관리자 용 명령어입니다." },
      { name: "냐옹이 음악", desc: "음악 명령어의 대한 도움말 입니다" },
      { name: "준비중", desc: "준비중입니다" },
      { name: "준비중", desc: "준비중입니다" },
    ]
    let commandStr = ""
    let embed = new Discord.MessageEmbed().setAuthor("", helpImg).setColor("#186de6").setFooter(``).setTimestamp()

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
  command(client, '관리자', (message) => {
    let helpImg = ""
      let commandList = [
        { name: "추방", desc: "멤버를 추방합니다" },
        { name: "차단 ", desc: "멤버를 차단합니다" },
        { name: "뮤트", desc: "멤버를 뮤트합니다 (x)" },
        { name: "청소", desc: "메시지를 청소합니다" },
      ]
      let commandStr = ""
      let embed = new Discord.MessageEmbed().setAuthor("", helpImg).setColor("#186de6").setFooter(``).setTimestamp()
  
      commandList.forEach((x) => {
        commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`
      })
      
      embed.addField("Commands: ", commandStr)
  
      message.channel.send(embed)
    })

  command(client, '청소', (message) => {
    if (message.channel.type == "dm") {
      return message.reply("dm에서 사용할 수 없는 명령어 입니다.")
    }

    if (message.channel.type != "dm" && checkPermission(message)) return

    var clearLine = message.content.slice("!청소 ".length)
    var isNum = !isNaN(clearLine)

    if (isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("아니 들어봐봐 숫자를 적어줘야지 너가 만약 나한테 물좀줘 라고하면 내가 10L 짜리 물 부어줄까?")
      return
    } else if (!isNum) {
      if (message.content.split("<@").length == 2) {
        if (isNaN(message.content.split(" ")[2])) return

        var user = message.content.split(" ")[1].split("<@!")[1].split(">")[0]
        var count = parseInt(message.content.split(" ")[2]) + 1
        let _cnt = 0

        message.channel.messages.fetch().then((collected) => {
          collected.every((msg) => {
            if (msg.author.id == user) {
              msg.delete()
              ++_cnt
            }
            return !(_cnt == count)
          })
        })
      }
    } else {
      message.channel
        .bulkDelete(parseInt(clearLine) + 1)
        .then(() => {
          message.channel.send(`<@${message.author.id}> ${parseInt(clearLine)} 락스로 치움 (이메시지도 치울거임)`).then((msg) => msg.delete({ timeout: 5000 }))
        })
        .catch(console.error)
    }
  })

function checkPermission(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> 당신이 해야될것은 지금바로 냥이지한테가서 메니저를 달라고 하세요 그러면 이 명령어를 쓰실수있습니다.`)
    return true
  } else {
    return false
  }
}

  function changeCommandStringLength(str, limitLen = 8) {
    let tmp = str
    limitLen -= tmp.length
  
    for (let i = 0; i < limitLen; i++) {
      tmp += " "
    }
  
    return tmp
  }
  
client.login(config.token);