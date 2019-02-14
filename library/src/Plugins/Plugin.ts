import { PalringoClient } from './../PalClient';
import { Dictionary } from './../Polyfill/Dictionary';
import { Group, User, ExtendedMessage } from './../Subprofile/Subprofile';
import { PalUtils } from './../Utilities/PalUtils';

export interface IPluginOptions {
    aliases?: string[];
    authCheck?: (user: User, group?: Group) => boolean;
    translateKey?: string;
    description?: string;
    gmOnly?: boolean;
    pmOnly?: boolean;
    cmdParser?: (msg: string) => any;
}

export class PluginInstance {
    static plugins: Dictionary<string, PluginInstance>;

    static register(command: string, options: IPluginOptions, fn: Function) {
        //Create an instance of the Plugins collection if there isn't one
        if (!PluginInstance.plugins)
            PluginInstance.plugins = new Dictionary<string, PluginInstance>();

        //Validate options and fill with details.
        if (!options)
            options = <IPluginOptions>{};
        if (!options.aliases)
            options.aliases = [];
        if (!options.authCheck)
            options.authCheck = (u, g) => true;
        if (!options.translateKey)
            options.translateKey = null;
        if (!options.description)
            options.description = 'PluginInstance';
        if (!options.pmOnly)
            options.pmOnly = false;
        if (!options.gmOnly)
            options.gmOnly = false;
        if (!options.cmdParser)
            options.cmdParser = (text) => text;

        //Create instance of the plugins
        var item = new PluginInstance();
        item.command = command;
        item.options = options;
        item.oncmdex = fn;

        //Add the instance of plugins to the collection
        PluginInstance.plugins.add(command, item);
    }

    static attach(client: PalringoClient) {
        client.On.GroupMessage = (msg) => {
            PluginInstance.onMessage(client, msg);
        };
        client.On.PrivateMessage = (msg) => {
            PluginInstance.onMessage(client, msg);
        };
        client.On.Trigger('log', 'Plugin Trigger Registered.');
    }

    private static onMessage(client: PalringoClient, msg: ExtendedMessage) {
        if (!msg.isText) {
            return;
        }
        
        if (msg.text.indexOf(client.commandCharacter) != 0) {
            return;
        }

        var ps = PluginInstance.plugins;

        var msgText = msg.text.slice(client.commandCharacter.length, msg.text.length).trim();

        var val = ps.getBy((k, v) => {
            if (msgText.indexOf(k) === 0)
                return true;
            for(let c of v.options.aliases) {
                if (msgText.indexOf(c) === 0)
                    return true;
            }
            return false;
        });

        if (!val) {
            console.log('No plugin matching text');
            return;
        }

        msgText = msgText.slice(val.command.length, msgText.length).trim();

        if (!val.options.authCheck(msg.userProfile, msg.group)) {
            return;
        }

        if (val.options.pmOnly && msg.isGroup) {
            return;
        }

        if (val.options.gmOnly && !msg.isGroup) {
            return;
        }

        //Do.Some.Translation.Stuff();

        val.oncmdex.call(this, client, msg);
    }
  
    public command: string;
    public options: IPluginOptions;
    public oncmdex: Function;

}