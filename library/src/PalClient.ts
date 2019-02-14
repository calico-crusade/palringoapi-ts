import { Message, ExtendedMessage, IMessage } from './Subprofile/Subprofile';
import { PluginInstance } from './Plugins/Plugin';
import { Delegates } from './Networking/Delegates';
import { Information } from './Subprofile/Information';
import { Client } from './Networking/Client';

export class PalringoClient {
    public _con: Client;

    public commandCharacter: string;

    public get Info() {
        return this._con.Info;
    }
    public get On() {
        return this._con.On;
    }

    constructor(url?: string) {
        this._con = new Client(url);
    }

    registerPlugins(cmdChar?: string) {
        this.commandCharacter = cmdChar || '!';
        PluginInstance.attach(this);
    }

    login(emailAddress: string, password: string) {
        this._con.login(emailAddress, password);
    }

    groupMessage(id: number, data: string, finished?: (data: any) => void) {
        if (typeof data === 'string') {
            this._con.groupTextMessage(id, data, finished);
            return;
        }
    }

    privateMessage(id: number, data: string, finsihed?: (data: any) => void) {
        if (typeof data === 'string') {
            this._con.privateTextMessage(id, data, finsihed);
            return;
        }
    }

    reply(msg: (IMessage | Message | ExtendedMessage), data: string, finished?: (data: any) => void) {
        if (msg.isGroup) {
            this.groupMessage(msg.recipient, data, finished);
        } else {
            this.privateMessage(msg.originator, data, finished);
        }
    }
}