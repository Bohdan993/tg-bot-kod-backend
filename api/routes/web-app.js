const {
    Router
} = require('express');
const router = Router();

router.post("/", (req, res) => {
    const {phone, name, lastName, userName, reservedOn} = req?.body;
    console.log(phone, name, lastName, userName, reservedOn);
    /// new Schema({});
    res.json({status: "ok", data: 'ok'});
});

module.exports = router