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
