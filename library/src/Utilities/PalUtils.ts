import { User, ExtendedUser, Group } from './../Subprofile/Subprofile';

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
}