const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const tgRoute = require('./routes/tg');
const webAppRoute = require('./routes/web-app');
const app = express();


const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'https://tg-bot-kod-git-working-bohdan993.vercel.app',
    // origin: 'http://localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/tg-result', tgRoute);
app.use('/api/web-app-result', webAppRoute)


function start(){
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}


module.exports = {
    start
}

