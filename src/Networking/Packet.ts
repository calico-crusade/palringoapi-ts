export class Packet {
    public command: string;
    public body: any;
    public timestamp: Date;

    constructor(cmd: string, data: any) {
        this.command = cmd;
        this.body = data;
        this.timestamp = new Date();
    }
}