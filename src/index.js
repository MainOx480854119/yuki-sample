import { ActivityType, Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: Object.values(GatewayIntentBits) });

/**
 * おみくじを引く関数
 * @returns {string}
 */
function getOmikuji() {
  const items = ['大吉', '吉', '中吉', 'にゃ〜〜〜ん'];
  const random = Math.floor(Math.random() * items.length);
  return items[random];
}

client
  .on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);

    client.user.setPresence({
      status: 'online',
      afk: false,
      activities: [{ name: 'おみくじ', type: ActivityType.Playing }]
    });
  })
  .on(Events.MessageCreate, message => {
    if (message.author.bot || message.author.system) return;
    if (!message.inGuild()) return;

    if (message.content.startsWith('！おみくじ')) {
      message.channel.send(getOmikuji());
      return;
    }
    if (message.mentions.has(client.user.id)) {
      if (message.content.match(/おみくじ/)) {
        message.channel.send(getOmikuji());
        return;
      }

      message.reply('呼びましたか？');
    }
  })
  .login();

process.on('uncaughtException', console.error);
