  
const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
  console.log('The client is ready!')
  client.user.setPresence({ activity: { name: ".냐옹이도움 | 창조자: 면 | 온라인"}, status: "online" })
})

 
command(client, '냐옹이 음악', (message) => {
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle('시즈닝 도움 을 입력하여 음악을 사용하세요')
message.channel.send(embed)

})

   command(client, '서버', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} 는 ${guild.memberCount} 명의 멤버가 있으시네요 앗싸 :smile:`
      )
    })
  })


  command(client, '준비중', (message) => {
    const number = [
      "트롤짜식아",
      "에옹",
      ":thinking:",
      "아..네",
      "난 호구가 아냐",
      "준비중이다 어쩔래",
      "아니 준비중인데 왜다들 그래..?",
      "진짜 흥",
      "준비중이 명령어임..?",
      "허..나 참내",
      "작작하세요 조옴 !!!!",
      "나 냥이지 한테 이를거야",
      "에블핑 한다 그만해라",
    ];
    
    const Response = Math.floor(Math.random() * number.length);
    
    message.channel.send(`${number[Response]}`)
    })
  command(client, '프사', (message) => {
    let embed = new Discord.MessageEmbed()

    .setTitle(`**${message.author.username}** 님의 프로필 입니다! `)
    .setColor(`#A9F5F2`)
    .setImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=2048`)

    message.channel.send({embed:embed})
  })

  command(client, '숙제', (message) => {
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('https://docs.google.com/forms/d/e/1FAIpQLSe3iyIjhotQPfl1h5jtZhduXGVDcX0tZnOQTZtWwLFWFXnwzg/viewform')
    .setFooter('누들 숙제임 저장할곳 없어서 여기다가 함')
    message.channel.send({embed:embed})
  })
  command(client, '시즈닝 도움', (message) => {
    let embed = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setTitle(` . 붙이지 말고 명령어 사용하세요. . ..`)
    message.channel.send({embed:embed})
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
      { name: "핑", desc: "현재 핑 상태" },
      { name: "관리자", desc: "관리자 용 명령어입니다." },
      { name: "냐옹이 음악", desc: "음악 명령어의 대한 도움말 입니다" },
      { name: "프사", desc: "당신에 프로필 사진을 확대해서 보여줄수있습니다." },
      { name: "시즈닝 도움", desc: "누들이라는 놈이 음악기능 냥이봇한테 추가하기 귀찬타고 시즈닝님봇 쓰레요" },
      { name: "코로나", desc: "코로나 상황을 확인하실수있습니다" },
      { name: "골라", desc: ".골라 <단어1> <단어2> 하시면 봇이 무작위로 단어를 골라줍니다." },
      { name: "준비중", desc: "준비중인데 이걸 명령어로 치는사람은 없겠지..?" },

    ]
    let commandStr = ""
    let embed = new Discord.MessageEmbed().setAuthor("", helpImg).setColor("RANDOM").setFooter(``).setTimestamp()

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
        { name: "마스크주기", desc: "멤버를 뮤트합니다" },
        { name: "청소", desc: "메시지를 청소합니다" },
        { name: "역할추가", desc: "메시지를 청소합니다" },
        { name: "역할삭제", desc: "특정유저의 약할을 삭제합니다." },
      ]
      let commandStr = ""
      let embed = new Discord.MessageEmbed().setAuthor("", helpImg).setColor("RANDOM").setFooter(``).setTimestamp()
  
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
  
client.login(process.env.token);