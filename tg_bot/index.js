const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const SETTINGS = {
  // WEB_APP_URL: 'https://tg-bot-kod.vercel.app/'
  WEB_APP_URL: 'https://tg-bot-kod-git-working-bohdan993.vercel.app/',
  HOUR: 60 * 60 * 1000
}

const COMMANDS = {
  NEWSESSION: '/newsession'
}

const MESSAGES = {
  GREETING: `Здрастуйте, Вас вітає барбершоп "КОД". Щоб записатися на сеанс введіть команду ${COMMANDS.NEWSESSION}.`,
  START_NEW_SESSION: `Натисніть на кнопку "Записатися".`,
  CREATE_NEW_SESSION_BUTTON: `Записатися`
}

// Listen for any kind of message. There are different kinds of
// messages.


async function messageHandle(msg){
  const chatId = msg.chat.id;
  console.log(msg);
  // send a message to the chat acknowledging receipt of their message
  await checkMessage(msg, chatId);
}

async function checkMessage(msg, chatId) {
  
  if(msg?.via_bot?.username === 'kodbarbershopbot') {
    return;
  }

  switch(msg?.text) {
    case COMMANDS.NEWSESSION : {
      await sendMessage(chatId);
      break;
    }
    default:{
      await bot.sendMessage(chatId, MESSAGES.GREETING);
      break;
    }
  }
}

async function sendMessage(chatId) {
  await bot.sendMessage(chatId, MESSAGES.START_NEW_SESSION, {
    reply_markup: {
      inline_keyboard: [
        [{text: MESSAGES.CREATE_NEW_SESSION_BUTTON, web_app: {url: SETTINGS.WEB_APP_URL}}]
      ]
    }
  });
}

function start(){
  bot.on('message', messageHandle);
}


// setTimeout(async function notifyUser(){
//   setTimeout(notifyUser, SETTINGS.HOUR);
//   const date = new Date();
//   if(date.getHours() > 11 && date.getHours() < 12) {
/************* LOGIC FOR USER NOTIFICATION GOES HERE 
 * 1. STEP - GET ALL USERS FROM DB WHOS LAST registration for the service < 30 DAYS THEN CURRENT DATE
 * 2. STEP - SEND MESSAGES TO APPROPRIATE CHATS
 * ***********************/  
//     await bot.sendMessage(574082184, `Привіт зараз ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
//   }
// });

// async function sendNotification(arr){
//   let currId;

//   try {
//     const date = new Date();
//     for(let i = 0; i < arr.length; i++) {
//       currId = arr[i];
//       await bot.sendMessage(currId, `Привіт зараз ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
//     }
//   } catch(err) {
//     console.log(err?.message);
//     if(err?.message.includes('blocked')) {
//       let newArr = arr.filter(id => id !== currId);
//       await test(newArr);
//       return;
//     }
//   }
 
//   console.log("OKAY");
// }

// sendNotification([574082184, 57408218450048, 57408218408044]);


module.exports = {
  start
}