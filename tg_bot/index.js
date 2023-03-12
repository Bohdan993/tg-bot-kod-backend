const TelegramBot = require('node-telegram-bot-api');
const UsersModel = require('../models/user');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const SETTINGS = {
  // WEB_APP_URL: 'https://tg-bot-kod.vercel.app/'
  WEB_APP_URL: 'https://tg-bot-kod-git-working-bohdan993.vercel.app/',
  TIME_MS: 60 * 60 * 1000,
  SELF_USERNAME: 'kodbarbershopbot',
  SEND_NOTIFICATION_PERIOD_DAYS: 30
}

const COMMANDS = {
  START: '/start',
  NEWSESSION: '/newsession'
}

const MESSAGES = {
  GREETING: `Здрастуйте, Вас вітає барбершоп "КОД". Щоб записатися на сеанс введіть команду ${COMMANDS.NEWSESSION}.`,
  START_NEW_SESSION: `Натисніть на кнопку "Записатися".`,
  CREATE_NEW_SESSION_BUTTON: `Записатися`,
  ERROR: `Вибачте, виникла невідома помилка. Спробуйте, будь ласка, ще раз.`,
  NOTIFICATION: `Час записатися на стрижку до барбершопу "КОД")`
}

const UTILS = {

  getPrevDate(){
    let day, month, year;
    const date = new Date();
    date.setDate(date.getDate() - SETTINGS.SEND_NOTIFICATION_PERIOD_DAYS);
    year = date.getFullYear();
    month = (date.getMonth() + 1 < 10) ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
    day = (date.getDate() < 10) ? ("0" + (date.getDate())) : date.getDate();

    return `${year}-${month}-${day}`;
  },

  async deactivateUser(chatId){
    const user = await UsersModel.findOne({where: {chatId}});
    user.isActive = false;
    await user.save();
  },
  notActiveUsers: [],
}

async function messageHandle(msg){
  const chatId = msg.chat.id;
  console.log(msg)
  try {
    await checkMessage(msg, chatId);
  } catch(err) {
    console.log(err);
    await sendMessage(chatId, MESSAGES.ERROR);
  }
}

async function checkMessage(msg, chatId) {
  
  if(msg?.via_bot?.username === SETTINGS.SELF_USERNAME) {
    return;
  }

  switch(msg?.text) {
    case COMMANDS.START: {
      await sendMessage(chatId, MESSAGES.GREETING);
      const candidate = await UsersModel.findOne({where:{chatId}});
      if(!candidate) {
        await UsersModel.create({
          chatId,
          name: msg?.from?.first_name || null,
          lastName: msg?.from?.lastName || null,
          userName: msg?.from?.username || null
        });
      } else {
        if(!candidate.isActive) {
          candidate.isActive = true;
          await candidate.save();
        }
      }
      break;
    }
    case COMMANDS.NEWSESSION : {
      await sendMessage(chatId, MESSAGES.START_NEW_SESSION, {
        reply_markup: {
          inline_keyboard: [
            [{text: MESSAGES.CREATE_NEW_SESSION_BUTTON, web_app: {url: SETTINGS.WEB_APP_URL}}]
          ]
        }
      });
      break;
    }
    default:{
      await sendMessage(chatId, MESSAGES.GREETING);
      break;
    }
  }
}

async function sendMessage(chatId, message, options = {}) {
  await bot.sendMessage(chatId, message, options);
}

setTimeout(async function notifyUser(){
  setTimeout(notifyUser, SETTINGS.TIME_MS);
  const date = new Date();
  if(date.getHours() > 11 && date.getHours() < 12) {
    const prevDate = UTILS.getPrevDate();

    const users = await UsersModel.findAll({where: {
      isBookedService: true,
      lastBookingDate: prevDate,
      isActive: true
    }});
    
    sendNotification(users.map(user => user.chatId));
  }
});

async function sendNotification(arr){
  let currId;

  try {
    for(let i = 0; i < arr.length; i++) {
      currId = arr[i];
      await sendMessage(currId, MESSAGES.NOTIFICATION);
    }
  } catch(err) {
    // console.log(err?.message);
    // if(err?.message.includes('blocked')) {
      let newArr = arr.filter(id => id !== currId);
      UTILS.notActiveUsers.push(currId);
      await sendNotification(newArr);

    // }
  }
  
  UTILS.notActiveUsers.forEach(chatId => UTILS.deactivateUser(chatId));
  console.log("SENDING NONIFICATION FINISHED");
  return
}

function start(){
  bot.on('message', messageHandle);
}

module.exports = {
  start
}