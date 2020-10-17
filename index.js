require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())

const PORT_NUMBER = process.env.PORT_NUMBER;

//Set up the endpoints 



//Whenever twitch sends a notification to your subscribed webhook topic
//it will send it to this endpoint. You have to send back a 200
//otherwise twitch will think you did not recieve the notification and spam you
app.post("/", (req, res) => {

    

    console.log("Notification recieved");
    console.log(req.body);

    return res.status(200).send();
})

//When Twitch sends a post request to the callback url you provided
//it will expect a 200 and the 'hub.challenge' query string
app.get("/", (req, res) => {

    
    res.status(200).send(req.query['hub.challenge']);

    console.log("Topic was subscribed to");

})

//Functions that handle registering a specific topic

async function registerWebhook(topicURL) {

    const TWITCH_API = "https://api.twitch.tv/helix/webhooks/hub";

    const data = {

        "hub.callback": process.env.TWITCH_API_CALLBACK_URL,
        "hub.mode": "subscribe",
        "hub.topic": topicURL,
        "hub.lease_seconds": 84600
    }



    const headers = {
        Authorization: `Bearer ${process.env.TWITCH_OAUTH}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
        "Content-Type": "application/json"
    }

    try {
        
        const response = await axios.post(TWITCH_API, data, {
            headers: headers
        })
        console.log(response.data)


    } catch (err) {
        console.error(err);
        
    }
}

app.listen(PORT_NUMBER);

//Example: Subscribe to new followers to a twitch user with id: 501793804
registerWebhook("https://api.twitch.tv/helix/users/follows?first=1&to_id=501793804")
