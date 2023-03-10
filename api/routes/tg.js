const {
    Router
} = require('express');
const fetch = require('node-fetch');
const {v4: uuidv4} = require('uuid');
const router = Router();

router.post("/", (req, res) => {
    const {query_id, user_id, message} = req?.body;
    const promise = new Promise(async (res, rej) => {
        try {
            const result = await fetch(process.env.TG_API_URL + process.env.BOT_TOKEN + "/answerWebAppQuery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "web_app_query_id": query_id,
                        "result": {
                            "type": "article",
                            "id": user_id + uuidv4(),
                            "title": 'New Order',
                            "input_message_content": {
                                "message_text": message
                            }
                        }
                    }
                )
            });

            if(!result?.ok) {
                throw new Error("Something went wrong!");
            }   

            const data = await result.json();
            res(data?.ok);
        } catch(err) {
            console.error(err?.message);
            rej(err?.message);
        }
    });

    promise
        .then(result => {
            console.log(result);
            res.json({status: "ok", data: 'ok'});
            return;
        })
        .catch(err => {
            console.error(err);
            return;
        });
});

module.exports = router