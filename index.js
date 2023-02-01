TELEGRAM_BOT_TOKEN = '6066170627:AAF3r2Pf0D3CaSwb0Y1gfbNXPtijSSAHU4Q'
const TeleBot = require('telebot');
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];
const CronJob = require('cron').CronJob;
const job = new CronJob(
	'0/5 * * * * *',
	function() {
		console.log('You will see this message every 5 seconds');
        chatIds.forEach((chatId) => {
            bot.sendMessage(chatId, 'Salom');
        });
	},
	null,
	true,

);
bot.on('text', (msg) => msg.reply.text('Kelgan habar:  ' + msg.text));
bot.on(['/start'], (msg) => {
    let chatId = msg.chat.id;
    if (!chatIds.includes(chatId)) {
        chatIds.push(chatId)
        msg.reply.text('Boshladik!');
        job.start();
    }
});
bot.on(['/stop'], (msg) => {
    let chatId = msg.chat.id;
    chatIds.pop(chatId);

});
bot.start();