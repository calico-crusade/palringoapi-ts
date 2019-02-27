import { PalBot, Plugin, PalringoClient, ExtendedMessage, PalUtils } from 'palringo-ts';

class Test {

    public bot: PalringoClient;
    public loggedIn: boolean = false;

    @Plugin('test', {
        aliases: ['t', '-t', '--test']
    })
    static testPlugin(client: PalringoClient, msg: ExtendedMessage) {
        client.reply(msg, "Hello how are you?");
        client.privateMessage(msg.userProfile.id, 'hello world');

        if (msg.isGroup)
            client.groupMessage(msg.group.id, 'hello world');

        var gr = client.Info.Groups.get(msg.group.id);
        
        var hist = client.Info.messageHistory(msg.id, msg.timestamp, msg.isGroup, (t) => {
            console.log('Message history', t);
        });
    }

    start() {
        this.bot = PalBot();
        this.bot.registerPlugins('!');
        this.bot.On.Log = (item) => console.log('Item logged', item);
        this.bot.On.LoginSuccess = (user) => {
            console.log('User logged in: ', user.nickname);
            this.loggedIn = true;
        };
        this.bot.On.LoginFailed = (reason) => { 
            console.log('Login Failed: ', reason);
            this.loggedIn = false;
        };
        this.bot.On.Disconnected = () => console.log('Disconnected');
        this.bot.On.Connected = () => console.log('Connected');
        this.bot.login('roulettetest@palbot.com', 'asdf');
    }
}

for(var i = 0; i < 10; i++)
    console.log(PalUtils.DeviceToken());
new Test().start();