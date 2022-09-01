const telegramBot = await import('/weintek_telebot.js');
var bot = new telegramBot.TelegramBot('5574052484:AAGQtD9YhYdFsOWTItxk4Op3ghk4ZlcucZw')
var chats = {}
var mouseArea = new MouseArea();
this.widget.add(mouseArea);

bot.makeButton(['Температура','Давление']);
bot.makeButton(['Скорость']);

setInterval(() => {
    var message = bot.getUpdates();
    var chatId = message.message.from.id
    var messageId = message.message.message_id
    var text = message.message.text
    if (!(chatId in chats)){
        chats[chatId]=[messageId, text];
        bot.sendMessage(text, chatId);
    }
    else {
        if (chats[chatId][0] != messageId){
            chats[chatId][0] = messageId;
            bot.sendMessage(text, chatId);
        }
    }
    } , 500);

mouseArea.on('click', (mouseEvent) => {
  if (!(Object.keys(chats).length == 0)){
      for (var key in chats) {
          var mes = bot.sendMessage('Привет! Я Weintek',key);
      }
  }
  else {
      console.log('Боту еще никто не отписал!!');
  }
});