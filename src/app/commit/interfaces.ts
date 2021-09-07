export interface Commit {
    name: string;
    url: string;
    message: string;
}


export class CommitsResult {
    constructor(public readonly count?: number, public readonly items?: Commit[]) { }
}