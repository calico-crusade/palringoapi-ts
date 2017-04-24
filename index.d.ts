declare namespace palringo {
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
	    deleted: boolean;
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
	            lon: number;
	        };
	        lang: number;
	        name1: string;
	        name2: string;
	        name3: string;
	        rel_status: number;
	        sex: number;
	        tags: string[];
	        urls: string[];
	        utc_offset: number;
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
	        updateTime: number;
	    };
	    sbSubscriberStateV3List: any[];
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
	    welcomeHost: boolean;
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
	    id: number;
	    isGroup: boolean;
	    mimeType: string;
	    originator: number;
	    recipient: number;
	    timestamp: number;
	    data: ArrayBuffer;
	}
	export class Message {
	    id: number;
	    isGroup: boolean;
	    mimeType: string;
	    originator: number;
	    recipient: number;
	    timestamp: number;
	    data: ArrayBuffer;
	    isImage: boolean;
	    isText: boolean;
	    isVoice: boolean;
	    isHtml: boolean;
	    text: string;
	    constructor(msg: IMessage);
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

	export class Dictionary<K, V> {
	    private Keys;
	    private Values;
	    constructor();
	    add(key: K, val: V): void;
	    remove(key: K): void;
	    get(key: K): V;
	    contains(key: K): boolean;
	    all(): KeyValuePair<K, V>[];
	    getBy(fn: (key: K, val?: V) => boolean): V;
	}
	export class KeyValuePair<K, V> {
	    Key: K;
	    Value: V;
	    constructor(Key?: K, Value?: V);
	}

	export class Delegates {
	    private _events;
	    constructor();
	    LoginSuccess: (item: ExtendedUser) => void;
	    LoginFailed: (item: string) => void;
	    GroupMessage: (item: ExtendedMessage) => void;
	    PrivateMessage: (item: ExtendedMessage) => void;
	    Connected: () => void;
	    Disconnected: () => void;
	    GroupJoined: (item: any) => void;
	    GroupLeft: (item: any) => void;
	    Log: (item: any) => void;
	    GroupUpdate: (item: any) => void;
	    AdminAction: (item: AdminAction) => void;
	    Trigger(event: string, data: any): void;
	    private es(name, fn);
	    private event(name, data);
	}

	export class Packet {
	    command: string;
	    body: any;
	    timestamp: Date;
	    constructor(cmd: string, data: any);
	}

	export class PalUtils {
	    static DeviceToken(): string;
	    static IdArray(data: (User | ExtendedUser | Group)[]): number[];
	    static StartsWith(str: string, find: string): boolean;
	    static Contains(str: string, find: string): boolean;
	    static EndsWith(str: string, find: string): boolean;
	}

	export function LoginPacket(u: string, p: string): Packet;
	export function MessagePacket(id: number, isGroup: boolean, msg: any, mimeType: string): Packet;
	export function PrivateMessageSubscribe(): Packet;
	export function GroupMessageSubscribe(id: number[]): Packet;
	export function GroupMessageSubscribeSingle(id: number): Packet;
	export function GroupList(): Packet;
	export function GroupProfile(id: Number, extendedProfile: boolean): Packet;
	export function UserProfile(id: number, extendedProfile: boolean): Packet;
	export function GroupMemberList(groupid: number): Packet;

	export class Client {
	    serverUrl: string;
	    connection: any;
	    Info: Information;
	    static debug: boolean;
	    private _id;
	    On: Delegates;
	    constructor(url?: string);
	    login(email: string, password: string): void;
	    groupTextMessage(id: number, text: string, finished?: (data: any) => void): void;
	    privateTextMessage(id: number, text: string, finished?: (data: any) => void): void;
	    writePacket(packet: Packet, callBack?: (data: any) => void): void;
	    writePacketAdv(packet: Packet, success?: (data: any) => void, failed?: (data) => void): void;
	    getMembers(groupid: number, finished?: (data: any) => void): void;
	    private _loginSuccess(user);
	}

	export class Information {
	    private con;
	    MyProfile: ExtendedUser;
	    static cache: boolean;
	    CachedUsers: Dictionary<Number, (ExtendedUser)>;
	    Groups: Dictionary<Number, Group>;
	    constructor(con: Client, MyProfile: ExtendedUser);
	    requestUser(id: number, callback?: (user: (ExtendedUser)) => void): void;
	    requestGroup(id: number, callback?: (group: (Group)) => void): void;
	    requestGroups(callback?: (groups: (Group[])) => void): void;
	}

	export class PalringoClient {
	    private _con;
	    commandCharacter: string;
	    readonly Info: Information;
	    readonly On: Delegates;
	    constructor();
	    registerPlugins(cmdChar?: string): void;
	    login(emailAddress: string, password: string): void;
	    groupMessage(id: number, data: string, finished?: (data: any) => void): void;
	    privateMessage(id: number, data: string, finsihed?: (data: any) => void): void;
	    reply(msg: (IMessage | Message | ExtendedMessage), data: string, finished?: (data: any) => void): void;
	}

	export interface IPluginOptions {
	    aliases?: string[];
	    authCheck?: (user: User, group?: Group) => boolean;
	    translateKey?: string;
	    description?: string;
	    gmOnly?: boolean;
	    pmOnly?: boolean;
	    cmdParser?: <T>(msg: string) => T;
	}
	export class PluginInstance {
	    static plugins: Dictionary<string, PluginInstance>;
	    static register(command: string, options: IPluginOptions, fn: Function): void;
	    static attach(client: PalringoClient): void;
	    private static onMessage(client, msg);
	    command: string;
	    options: IPluginOptions;
	    oncmdex: Function;
	}

	export function PalBot(): PalringoClient;
	export function Plugin(command: string, options?: IPluginOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;


}
export = palringo;
