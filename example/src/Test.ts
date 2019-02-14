import { PalBot, Plugin, PalringoClient, ExtendedMessage } from 'palringo-ts';

class Test {

    public bot: PalringoClient;

    @Plugin('test', {
        aliases: ['t', '-t', '--test']
    })
    static testPlugin(client: PalringoClient, msg: ExtendedMessage) {
        client.reply(msg, "Hello how are you?");
        client.privateMessage(msg.userProfile.id, 'hello world');

        if (msg.isGroup)
            client.groupMessage(msg.group.id, 'hello world');

        var gr = client.Info.Groups.get(msg.group.id);
        
    }

    start() {
        this.bot = PalBot();
        this.bot.registerPlugins('!');
        this.bot.On.Log = (item) => console.log('Item logged', item);
        this.bot.On.LoginSuccess = (user) => console.log('User logged in: ', user.nickname);
        this.bot.On.LoginFailed = (reason) => console.log('Login Failed: ', reason);
        this.bot.On.Disconnected = () => console.log('Disconnected');
        this.bot.On.Connected = () => console.log('Connected');
        this.bot.login('example@email.com', 'password');
    }
}

new Test().start();