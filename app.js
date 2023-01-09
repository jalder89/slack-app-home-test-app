const { App } = require('@slack/bolt');
require('dotenv').config();

// Initialize Slack app
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

// Listen for app home opened event
app.event('app_home_opened', async ({ event, client }) => {
    console.log(event);
    // Check if the event does not contain a view payload
    if (!event.view) {
        // Send a welcome message to the user
        await client.chat.postMessage({
            channel: event.user,
            text: `Welcome home, <@${event.user}>!`
        });
    }
});

// Start your app
(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();