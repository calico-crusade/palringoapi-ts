# Palringo Type Script API
An api for typescript and nodejs that allows for connecting to and messaging on palringo.im's socket.io connection.

## Type Script Usage
Install the package from npm
```npm
npm i palringo-ts -d
```

Reference the api in your application
```typescript
import { PalBot, Plugin, PalringoClient, ExtendedMessage } from 'palringo-ts';

class SomeClass {
    bot: PalringoClient;
    
    start() {
        this.bot = PalBot();
        this.bot.On.LoginSuccess = (user) => console.log('User logged in: ', user.nickname);
        this.bot.On.LoginFailed = (reason) => console.log('Login Failed: ', reason);
        this.bot.login('email', 'password');
    }
}

new SomeClass().start();
```

## NodeJS Usage
Install the package from npm
```npm
npm i palringo-ts -d
```

Reference the api in your application
```javascript
var pal = require('palringo-ts');

var bot = pal.PalBot();
bot.On.LoginSuccess = function (user) { console.log('User logged in: ', user); };
bot.On.LoginFailed = function (reason) { console.log('Login Failed: ', reason); };
bot.login('email', 'password');
```

## Handling events
All of the events are handled from the Delegates class which is pre-hooked up within the PalringoClient class.
The events are as follows:
```javascript
//when the bot logs in successfully
bot.On.LoginSuccess = function (user) {}
//if the login fails
bot.On.LoginFailed = function (reason) {}
//when the bot sees a group message
bot.On.GroupMessage = function (message) {}
//when the bot sees a private message
bot.On.PrivateMessage = function (message) {}
//when the connection to the socket.io server is made
bot.On.Connected = function () {}
//when the connection to the socket.io server is disconnected
bot.On.Disconnected = function() {}
//When the bot joins or leaves a group
bot.On.GroupJoined = function(group){}
bot.On.GroupLeft = function (group) {}
//When the bot sees someone leave or join a group
bot.On.GroupUpdate = function(any){}
//When the bot sees an admin action in the group
bot.On.AdminAction = function(action){}
```

## Plugins
If you want to use the built in plugin handlers, you will need to use TypeScript

Import the ``` Plugin ``` class from the palringo-ts library

Create a plugin with the following:
```typescript

import { Plugin, PalringoClient, ExtendedMessage } from 'palringo-ts';

class Test {

    @Plugin('test')
    static somePlugin(client: PalringoClient, msg: ExtendedMessage) {

        //msg contains information about the message, the user sending it, and possibly the group it was sent in (if it was a group message)
        //client is the bot connection that can be used to reply

        //The following will reply to any person who uses this plugin with 'hello world'
        client.reply(msg, "hello world");
    }
}
```

In order to register the plugins with the bot you will need to call the ```registerPlugins(cmd?: string)``` method that is on the PalringoClient class
