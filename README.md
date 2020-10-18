# Twitch Webhook Example

##### I wrote this example to help out a friend. I too struggled with understanding how webhooks worked

##### I do hope this helps other people as well.

##### Feel free to contribute to it howeveer you like :)

## Enviroment Variables

All enviroment variables required are listed in the .env.example file as well as in the below table
| Variable Name           | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| TWITCH_OAUTH            | This is your Twitch OAUTH token                                                   |
| TWITCH_CLIENT_ID        | Your Twitch Client ID that is linked with the above token                         |
| PORT_NUMBER             | This is your port number that your callback url and express server will listen on |
| TWITCH_API_CALLBACK_URL | The url that will listen for subscribed webhook notifications (more info below)   |

## Dependencies

- Express
- Axios
- Dotenv
- ngrok (more on this below)



## Basic Workflow

When it comes how Twitch Webhooks work, this is the basic flow.

1. Twitch recieves the request from you and that includes the callback URL.
2. Twitch will then send a 202 (Accepted) back to the requestor
3. Twitch then makes a GET request to the callback url and expects:
   a. The 'hub.challenge' query string
   b. A 200 response

_Note: If the callback does not respond, the webhook will not register_

##### That's it!

## Things you need to be aware of

- Using `http://localhost:[port]` as your callback url will not work. I used ngrok for this.

### How do I use ngrok with this?

Glad you asked!

1. Install ngrok with npm `npm install ngrok`
2. Then use the following command to generate an ngrok url with the **same** port your express server is listening on `ngrok http [port]`
3. You will get back an ngrok url after running that command ! [ngrok screenshot] (https://i.imgur.com/ltceoRP.png)
4. Plug this url in your `.env` file as an enviroment variable which will pass that to your request payload as your Twitch API callback url

That's it, your express server is now listening on `http://localhost:[port]` and ngrok will forward all request to localhost!
