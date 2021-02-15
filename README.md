# log4js-discord
simple log4js appender for discord webhooks

# Creating a Webhook
Create a webhook as outlined in discord's [documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
Copy the URL for the webhook which should look something like this:

```https://discord.com/api/webhooks/<webhook id>/<webhook token>```

The ID and token should be extracted from the URL and passed as parameters to this appender.

# Example Configuration
This configuration would send all info logging messages or more severe to the console, but filter to
warning or more severe for messages sense to the discord webhook.

```js
const log4js = require("log4js");
log4js.configure({
  appenders: {
      out: {type: 'console'},
      webhook: {
        type: '@munelear/log4js-discord',
        webhookId: process.env.LOGGER_WEBHOOK_ID,
        webhookToken: process.env.LOGGER_WEBHOOK_TOKEN
      },
      webhookFilter: {
        type: 'logLevelFilter', appender: 'webhook', level: process.env.WEBHOOK_LOG_LEVEL || 'warn'
      }
  },
  categories: {
    default: {appenders: ['out', 'webhookFilter'], level: process.env.LOG_LEVEL || "info"}
  }
});
```