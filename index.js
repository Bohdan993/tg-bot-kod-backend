require('dotenv').config();
const sequelize = require('./db');
const {start: botStart} = require('./tg_bot');
const {start: apiStart} = require('./api');


async function start(){
    try {
        // await sequelize.authenticate();
        // await sequelize.sync();
        // await connectDB(); 
        botStart();
        apiStart();

    } catch(err){
        console.error(err);
    }
}


start();