export interface Repository {
    name: string;
    avatarUrl: string;
    createdAt: Date;
    language: string;
    stars: number;
}

export class RepositoriesResult {
    constructor(public readonly count: number, public readonly items: Repository[]) { }
}