import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { SEARCH_SERVICE, SearchService } from "../shared";
import { CommitSearchResponse } from "../shared/dtos/commit-search.response";
import { Commit } from "./interfaces";

@Injectable()
export class CommitService {
    constructor(@Inject(SEARCH_SERVICE) private readonly searchService: SearchService) { }

    public search(repoFullName: string, searchText: string, page: number, perPage: number = 30) {
        const searchString = buildSearchString(repoFullName, searchText);

        return this.searchService.searchCommits(searchString)
                .pipe(map((res) => mapCommitSearchResponse(res)));
    }
}

function buildSearchString(repoFullName: string, searchText: string) {
    if(repoFullName) {
        return `repo:${repoFullName}+${searchText}`;
    }
    
    return searchText;
}

function mapCommitSearchResponse(response: CommitSearchResponse) {
    return response.items.map((c) => (
        {
            name: c.commit.author.name,
            url: c.commit.url,
            message: c.commit.message
        } as Commit
    ));
}

