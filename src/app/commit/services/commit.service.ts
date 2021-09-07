import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { API_SERVICE, ApiService } from "../../shared";
import { Item } from "../../shared/api-response-objects/commit-search.response";
import { GetCommitResponse } from "../../shared/api-response-objects/get-commit.response";
import { Commit } from "../interfaces";

@Injectable()
export class CommitService {
    constructor(@Inject(API_SERVICE) private readonly searchService: ApiService) { }

    public getCommits(repoFullName: string, page: number) {
        return this.searchService.getCommits(repoFullName, page)
            .pipe(map((res) => res.map(mapGetCommitResponse)));
    }

    public search(repoFullName: string, searchText: string, page: number) {
        const searchString = buildSearchString(repoFullName, searchText);

        return this.searchService.searchCommits(searchString, page)
                .pipe(map((res) => res.items.map(mapCommitSearchResponse)));
    }
}

function buildSearchString(repoFullName: string, searchText: string) {
    if(repoFullName) {
        return `repo:${repoFullName}+${searchText}`;
    }
    
    return searchText;
}

function mapCommitSearchResponse(item: Item) {
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

