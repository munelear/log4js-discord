const {MessageEmbed, WebhookClient} = require("discord.js");

const colors = {
  info: 41215,
  warn: 16764928,
  error: 13107200,
  ok: 5299300,
};

const getColor = (color) => {
  if (colors.hasOwnProperty(color)) {
    return colors[color];
  }
  if (isNaN(color)) {
    return colors.warn;
  }
  return color;
};

function configure(config, layouts) {
  const layout = config.layout ? layouts.layout(config.layout.type, config.layout) :
    layouts.patternLayout('%m');

  if (!config.webhookId || !config.webhookToken) {
    return new Error('log4js discord webhook appender missing webhookId or webhookToken from configuration');
  } else {
    config.webhook = new WebhookClient(config.webhookId, config.webhookToken);
  }
  return discordWebhookAppender(config, layout);
}

function discordWebhookAppender(config, layout) {
  const appender = (loggingEvent) => {
    const embedContent = {
      title: loggingEvent.categoryName,
      color: getColor(loggingEvent.level.levelStr),
      description: layout(loggingEvent)
    };
    const embed = new MessageEmbed(embedContent);
    config.webhook.send(embed).catch((err) => {
      console.error(`Error sending log4js discord webhook message: ${JSON.stringify(embedContent)}\n` + err);
    });
  };
  return appender;
}

module.exports.configure = configure;