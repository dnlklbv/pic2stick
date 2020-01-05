const TelegramBot = require('node-telegram-bot-api');
const processImage = require('./src/processImage');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const supportedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'image/gif'];

bot.on('document', async (msg) => {
  const { chat, document } = msg;

  if (!supportedTypes.includes(document.mime_type)) {
    bot.sendMessage(chat.id, 'Use one of the supported types: JPEG, PNG, BMP, TIFF, GIF');
    return;
  }

  const fileLink = await bot.getFileLink(document.file_id);
  const buffer = await processImage(fileLink);

  const fileOptions = { filename: `sticker-${document.file_name}` };
  bot.sendDocument(chat.id, buffer, {}, fileOptions);
});
