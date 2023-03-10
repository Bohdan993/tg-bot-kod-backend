require('dotenv').config();
// const {connectDB} = require('../db');
const {start: botStart} = require('./tg_bot');
const {start: apiStart} = require('./api');


async function start(){
    try {
        // await connectDB();
        botStart();
        apiStart();

    } catch(err){
        console.error(err);
    }
}


start();