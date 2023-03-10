const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const tgRoute = require('./routes/tg');
const webAppRoute = require('./routes/web-app');
const app = express();


const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
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

