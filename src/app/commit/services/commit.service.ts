import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { API_SERVICE, CommitItem, GetCommitResponse, ApiService } from "../../github-client";
import { Commit } from "../interfaces";

@Injectable()
export class CommitService {
    constructor(@Inject(API_SERVICE) private readonly apiService: ApiService) { }

    public getCommits(repoFullName: string, page: number) {
        return this.apiService.getCommits(repoFullName, page)
            .pipe(map((res) => ({
                count: res.length,
                items: res.map(mapGetCommitResponse)
            })));
    }

    public search(repoFullName: string, searchText: string, page: number) {
        const searchString = buildSearchString(repoFullName, searchText);

        return this.apiService.searchCommits(searchString, page)
                .pipe(map((res) => ({
                    count: res.total_count,
                    items: res.items.map(mapCommitSearchResponse)
                })));
    }
}

function buildSearchString(repoFullName: string, searchText: string) {
    if(repoFullName) {
        return `repo:${repoFullName}+${searchText}`;
    }
    
    return searchText;
}

function mapCommitSearchResponse(item: CommitItem) {
    return {
            name: item.commit.author.name,
            url: item.html_url,
            message: item.commit.message
    } as Commit;
}

function mapGetCommitResponse(response: GetCommitResponse) {
    return { 
        name: response.commit.author.name,
        url: response.html_url,
        message: response.commit.message
    } as Commit;
}

