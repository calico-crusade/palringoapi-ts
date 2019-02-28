declare var TextDecoder: any, TextEncoder: any;

export class User {
    contactListAuthState: any;
    contactListBlockedState: any;
    deviceType: number;
    groupMemberCapabilities: any;
    icon: number;
    id: number;
    nickname: string;
    onlineState: number;
    privileges: number;
    reputation: number;
    status: string;
}

export class ExtendedUser extends User {
    adminArea: boolean;
    adult: boolean;
    alphaTester: boolean;
    barred: boolean;
    barredExpired: null;
    barredReason: null;
    bot: boolean;
    botTester: boolean;
    configAdmin: boolean;
    contentSubmitter: boolean;
    created: number;
    createdTs: number;
    deleted: boolean
    developer: boolean;
    deviceType: number;
    eliteClub1: boolean;
    eliteClub2: boolean;
    email: string;
    failedAttempt: number;
    gameTester: boolean;
    groupAdmin: boolean;
    language: number;
    lastOnline: number;
    lastOnlineTs: number;
    lastReceived: number;
    level: number;
    name: string;
    newsAdmin: boolean;
    notify: boolean;
    onlineState: number;
    pcs: boolean;
    pest: boolean;
    premium: boolean;
    privilegeAdmin: boolean;
    profileInfo: {
        about: string;
        dob_d: number;
        dob_m: number;
        dob_y: number;
        home_loc: {
            accuracy: number;
            country: string;
            lat: number;
            lon: number
        };
        lang: number;
        name1: string;
        name2: string;
        name3: string;
        rel_status: number;
        sex: number;
        tags: string[];
        urls: string[];
        utc_offset: number
    };
    readOnly: boolean;
    repAdjust: number;
    reputationLevel: number;
    sbGroupPushTime: number;
    sbPushPrivacy: boolean;
    sbSubscriberAchievementList: any;
    sbSubscriberBalance: any;
    sbSubscriberReputation: {
        activeDays: number;
        groupWords: string;
        reputation: number;
        reputationAdjust: number;
        reputationLevel: number;
        updateTime: number
    };
    sbSubscriberStateV3List: any[]
    spamFilter: boolean;
    staff: boolean;
    stateV2UpdateTime: number;
    suspended: number;
    translator: boolean;
    updateSource: string;
    userAdmin: boolean;
    userMod: boolean;
    vip: boolean;
    volunteer: boolean;
    welcomeHost: boolean
}


export class Group {
    description: string;
    id: number;
    members: number;
    muted: boolean;
    name: string;
    owner: User;
    peekable: boolean;
    premium: boolean;
}

export class ExtendedGroup extends Group {
    
}

export interface IMessage {
    id: string;
    isGroup: boolean;
    mimeType: string;
    originator: number;
    recipient: number;
    timestamp: number;
    data: ArrayBuffer;
}

export class Message {
    id: string;
    isGroup: boolean;
    mimeType: string;
    originator: number;
    recipient: number;
    timestamp: Date;
    data: ArrayBuffer;

    isImage: boolean;
    isText: boolean;
    isVoice: boolean;
    isHtml: boolean;
    text: string;

    constructor(msg?: IMessage) {
        if (!msg)
            return;

        this.id = msg.id;
        this.isGroup = msg.isGroup;
        this.mimeType = msg.mimeType;
        this.originator = msg.originator;
        this.recipient = msg.recipient;
        this.data = msg.data;

        this.isImage = msg.mimeType == 'text/image_link';
        this.isText = msg.mimeType == 'text/plain';
        this.isVoice = msg.mimeType == 'audio/x-speex';
        this.isHtml = msg.mimeType == 'text/html';

        if (!this.isVoice) {
            this.text = new TextDecoder().decode(this.data);
        }
    }
}

export class ExtendedMessage extends Message {
    userProfile: ExtendedUser;
    group?: Group;
}

export class AdminAction {
    type: string;
    groupId: number;
    targetId: number;
    sourceId: number;
}

export interface IIdHash {
    id: number;
    hash: string;
}

export interface IHistoricalMessageMetadata {
    isSpam?: boolean;
}

export interface IHistoricalMessage {
    id: string;
    isGroup: boolean;
    timestamp: number;
    data: ArrayBuffer;
    originator: IIdHash | number;
    recipient: IIdHash | number;
    metadata: IHistoricalMessageMetadata;
    mimeType: string;
}