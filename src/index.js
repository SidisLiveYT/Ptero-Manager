// Declaring Packages
require('dotenv').config();
const fs = require('fs');
const { Collection, Client } = require('discord.js');

const bot = new Client();

// Declaring Custom Events
const { DB_Connection } = require('./util/Mysq_Connection.js');
const {
  DM_ErrorEmbedGen, DM_NormalEmbedGen, ErrorEmbedGen, NormalEmbedGen,
} = require('./util/Embed_Generator.js');
const { Checker_Add_User_J4R, Checker_Remove_User_J4R } = require('./events/Join_for_Resources/Users_Checker_Manager.js');

// Declaring External Custom Events
DB_Connection(bot);

// Collection Manupulation
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/Main').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/Main/${file}`);
  bot.commands.set(command.name, command);
}

const cooldowns = new Collection();

// Ready Event
bot.on('ready', () => {
  bot.user.setPresence({
    status: 'online',
    activity: {
      name: 'over Nodes and Panels | https://client.g-host.xyz | G-Host Support Bot v1.0.0',
      type: 'WATCHING',
    },
  });
  return console.info(`I am Ready and I will logged as - ${bot.user.tag} 🚧`);
});

// Message Event
bot.on('message', (message) => {
  if (`${message.author.id}` === `${bot.user.id}`) return;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const prefix_guild = process.env.Prefix;

  if (!message.content.startsWith(prefix_guild)) return;

  const args = message.content.slice(prefix_guild.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const Embedm = {
        title: 'Command Usage Cooldown Request',
        des: `**Don't Rush , G-Host Support Bot may get** ${hash} Overload ${hash}\n**Please wait for** ${timeLeft.toFixed(1)} **more seconds before reusing the** ${hash} ${prefix_guild}\`${command.name}\` ${hash} **command**.`,
      };
      return ErrorEmbedGen(bot, Embedm, message);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  command.execute(bot, message, args);
});

bot.on('guildMemberAdd', (member) => Checker_Add_User_J4R(bot, member));

bot.on('guildMemberRemove', (member) => Checker_Remove_User_J4R(bot, member));

// Logging in to discord
bot.login(process.env.Token);
