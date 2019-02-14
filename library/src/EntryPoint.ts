import { IPluginOptions, PluginInstance } from './Plugins/Plugin';
import { PalringoClient } from './PalClient';

export function PalBot(url?: string): PalringoClient {
    return new PalringoClient(url);
}

export function Plugin(command: string, options?: IPluginOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var fn: Function;
        var names = Object.getOwnPropertyNames(target).filter(function (p) {
            if (typeof target[p] === 'function')
                fn = target[p];
        });
        if (fn)
            PluginInstance.register(command, options, fn);
    }
}