import { User, ExtendedUser, Group, IMessage, Message, IHistoricalMessage, IIdHash } from './../Subprofile/Subprofile';
declare var TextDecoder: any, TextEncoder: any;
export class PalUtils {
    static DeviceToken(): string {
        var d = new Date().getTime();
        var uuid = 'WExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
        return uuid;   
    }

    static IdArray(data: (User | ExtendedUser | Group)[]) {
        var ids: number[] = [];
        for (let item of data) {
            ids.push(item.id);
        }
        return ids;
    }

    static StartsWith(str: string, find: string) {
        return str.indexOf(find) == 0;
    }

    static Contains(str: string, find: string) {
        return str.indexOf(find) != -1;
    }

    static EndsWith(str: string, find: string) {
        return str.indexOf(find) == (str.length - find.length);
    }

    static toPalTime(date: Date) {
        return date.getTime() * 1e3; //weird date format...?
    }
    
    static fromPalTime(data: number) {
        return new Date(data / 1e3);
    }

    static toProperMessage(msg: IMessage) : Message {
        var m = new Message(msg);
        m.timestamp = PalUtils.fromPalTime(msg.timestamp);
        return m;
    }

    static fromHistoricalMessage(msg: IHistoricalMessage) : Message {
        var m = new Message();

        m.data = msg.data;
        m.id = msg.id;
        m.isGroup = msg.isGroup;
        m.isHtml = msg.mimeType == "text/html";
        m.isImage = msg.mimeType == "text/image_link";
        m.isText = msg.mimeType == "text/plain";
        m.isVoice = msg.mimeType == "audio/x-speex";
        m.mimeType = msg.mimeType;
    
        if (typeof msg.originator === 'number'){
            m.originator = msg.originator;
        } else {
            m.originator = msg.originator.id;
        }

        if (typeof msg.recipient === 'number'){
            m.recipient = msg.recipient;
        } else {
            m.recipient = msg.recipient.id;
        }
        
        m.text = new TextDecoder().decode(msg.data);
        m.timestamp = PalUtils.fromPalTime(msg.timestamp);

        return m;
    }

    static fromHistory(msgs: IHistoricalMessage[]) : Message[] {
        var out = [];

        for(var i = 0; i < msgs.length; i++){
            out.push(PalUtils.fromHistoricalMessage(msgs[i]));
        }

        return out;
    }
}