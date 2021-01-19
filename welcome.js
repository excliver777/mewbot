  
module.exports = (client) => {
    const channelId = '800642354062163981' // welcome channel
    const targetChannelId = '800644470038593576' // rules and info
  
    client.on('guildMemberAdd', (member) => {
      const message = `<@${
        member.id
      }> 냥! 환영한다 냥! 규칙읽고  ${member.guild.channels.cache
        .get(targetChannelId)
        .toString()} <#800877706123411486> 에 동의하셔야지 채팅을 치실수있습니다!`
  
      const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
    })
  }
