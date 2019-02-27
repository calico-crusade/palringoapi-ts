export class Packet {
    public command: string;
    public body: any;
    public timestamp: Date;
    public headers?: any = null;

    constructor(cmd: string, data: any, headers: any = null) {
        this.command = cmd;
        this.body = data;
        this.timestamp = new Date();
        this.headers = headers;
    }
}