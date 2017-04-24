import { Information } from './../Subprofile/Information';
import { Dictionary } from './../Polyfill/Dictionary';
var io = require('./../../node_modules/socket.io-client/dist/socket.io.js');
import { Packet } from './Packet';
import { Delegates } from './Delegates';
import { PalUtils } from './../Utilities/PalUtils';
import { LoginPacket, PrivateMessageSubscribe, GroupList, GroupMessageSubscribe, GroupMessageSubscribeSingle, MessagePacket, GroupMemberList } from './PacketTemplate';
import { User, Group, IMessage, Message, ExtendedMessage, ExtendedUser, AdminAction } from './../Subprofile/Subprofile';

/// <reference types="socket.io-client" />

export class Client {
    public serverUrl: string = 'https://v3.palringo.im:3051/';
    public connection: SocketIOClient.Socket;
    public Info: Information;
    static debug = true;
    private _id: number;

    public On: Delegates;

    constructor(url?: string) {
        if (url) {
            this.serverUrl = url;
        }
        this.On = new Delegates();
        this.On.LoginSuccess = (user) => this._loginSuccess(user);
    }

    login(email: string, password: string) {
        var url = this.serverUrl + "?token=" + PalUtils.DeviceToken() + "&device=web";
        this.connection = io(url, {
            transports: ['websocket'],
            reconnect: true
        });
        this.connection.on('welcome', (data) => { 
            this.writePacket(LoginPacket(email, password), (data) => {
                if (data.code == 200) {
                    this._id = data.body.id;
                    this.On.Trigger('ls', data.body);
                } else {
                    this.On.Trigger('lf', data);
                }
            });
        });
        this.connection.on('connect', (data) => this.On.Trigger('cn', data));
    }

    //#region Packet Senders

    groupTextMessage(id: number, text: string, finished?: (data: any) => void) {
        this.writePacket(MessagePacket(id, true, text, 'text/plain'), finished);
    }

    privateTextMessage(id: number, text: string, finished?: (data: any) => void) {
        this.writePacket(MessagePacket(id, false, text, 'text/plain'), finished);
    }

    //#endregion

    writePacket(packet: Packet, callBack?: (data: any) => void) {
        if (!callBack)
            this.connection.emit(packet.command, { body: packet.body });
        else
            this.connection.emit(packet.command, { body: packet.body }, callBack);
    }

    writePacketAdv(packet: Packet, success?: (data: any) => void, failed?: (data) => void) {
        this.connection.emit(packet.command, { body: packet.body }, (data: { code: number, body: any }) => {
            if (Client.debug) {
                console.debug('Packet Processed: ' + packet.command, data);
            }
            
            if (data.code == 200) {
                if (success) {
                    success(data.body);
                }
            } else {
                if (failed) {
                    failed(data);
                }
            }
        });
    }
    
    getMembers(groupid: number, finished?: (data: any) => void) {
        this.writePacketAdv(GroupMemberList(groupid), finished);
    }

    //#region Handlers

    private _loginSuccess(user: ExtendedUser) {
        this.Info = new Information(this, user);
        //Set up message handling
        this.connection.on('message send', (data: { body: IMessage }) => {
            if (data.body.originator == this._id) {
                return;
            }

            var msg = new ExtendedMessage(data.body);
            var userId = msg.originator;
            this.Info.requestUser(userId, (u) => {
                msg.userProfile = u;
                if (msg.isGroup) {
                    var groupId = msg.recipient;
                    this.Info.requestGroup(groupId, (g) => {
                        msg.group = g;
                        this.On.Trigger('gm', msg);
                    });
                } else {
                    this.On.Trigger('pm', msg);
                }
            });

            /*if (data.body.isGroup) {
                var groupId = msg.recipient;
                this.Info.requestUser(userId, (u) => {
                    msg.userProfile = u;
                    this.Info.requestGroup(groupId, (g) => {
                        msg.group = g;
                        this.On.Trigger('gm', msg);
                    });
                });
                //this.On.Trigger('gm', new Message(data.body));
            } else {
                var userId = msg.recipient;
                //this.On.Trigger('pm', new Message(data.body));
            }*/
        });
        //Subscribe to all private messages
        this.writePacket(PrivateMessageSubscribe());
        //Subscribe to all group messages
        this.Info.requestGroups((gs) => {
            if (gs.length <= 0)
                return;
            
            this.getMembers(gs[0].id, (res) => {
                console.log('group member response', res);
            });
            this.writePacket(GroupMessageSubscribe(PalUtils.IdArray(gs)));
        });
        //Setup admin action handling
        this.connection.on('group admin', (data: { body: AdminAction }) => {
            if (data.body.type == 'join' || data.body.type == 'leave') {
                this.On.Trigger('gu', data.body);
                return;
            }

            this.On.Trigger('aa', data.body);
        });
        //Setup subscriber state updates
        this.connection.on('subscriber state update', (data: { body: any }) => {
            this.On.Trigger('gu', data.body);
        });
    }

    //#endregion
}

/*

INCOMING

    subscriber state update
        Contact updates

    group admin
        Group Joins
        Group Admin Actions

OUTGOING

    message group subscribe
        Subscribe to a group message system
        - id (Group ID)
        - idList (List of Group IDs)
    

*/