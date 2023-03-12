const {
    Router
} = require('express');
const UsersModel = require('../../models/user');
const router = Router();

router.post("/", async (req, res) => {
    const {phone, reservedOn, chatId} = req?.body;
    const user = await UsersModel.findOne({where: {chatId}});
    user.phone = phone;
    user.lastBookingDate = reservedOn;
    user.isBookedService = true;
    await user.save();
    res.json({status: "ok", data: 'ok'});
});

module.exports = router