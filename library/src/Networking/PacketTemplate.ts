import { Packet } from './Packet';
import { PalUtils } from './../Utilities/PalUtils';

export function LoginPacket(u: string, p: string) {
    return new Packet('security login', {
        username: u,
        password: p
    })
}

export function MessagePacket(id: number, isGroup: boolean,
    msg: any, mimeType: string) {

    return new Packet('message send', {
        recipient: id,
        data: msg,
        mimeType: mimeType,
        isGroup: isGroup
    });
}

export function PrivateMessageSubscribe() {
    return new Packet('message private subscribe', {});
}

export function ConversationHistory(latestMessage?: Date) {

    var b = latestMessage ? { timestamp: latestMessage } : {};

    return new Packet("message conversation list", b, {
        version: 2
    })
}

export function MessageHistory(id: number, from: Date, group: boolean) {
    return new Packet(group ? 'message group history list' : 'message private history list', {
        id: id,
        timestampEnd: PalUtils.toPalTime(from)
    }, {
        version: 2
    });
}

export function GroupMessageSubscribe(id: number[]) {
    return new Packet('message group subscribe', {
        idList: id
    });
}

export function GroupMessageSubscribeSingle(id: number) {
    return new Packet('message group subscribe', {
        id: id
    });
}

export function GroupList() {
    return new Packet('group list', {});
}

export function GroupProfile(id: Number, extendedProfile: boolean){
    return new Packet('group profile', {
        id: id,
        extended: extendedProfile
    });
}

export function UserProfile(id: number, extendedProfile: boolean) {
    return new Packet('subscriber profile', {
        id: id,
        extended: extendedProfile
    });
}

export function GroupMemberList(groupid: number) {
    return new Packet('group member list', {
        id: groupid,
        subscribe: true
    });
}