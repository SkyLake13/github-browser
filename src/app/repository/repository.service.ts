import { Inject, Injectable } from "@angular/core";
import { map, mergeMap } from "rxjs/operators";
import { SEARCH_SERVICE, SearchService } from "../shared";
import { IssuesSearchResponse } from "../shared/dtos/issue-search.response";
import { RepositoryResponse } from "../shared/dtos/repository-search.response";
import { Repository } from "./interfaces";

@Injectable()
export class RepositoryService {
    constructor(@Inject(SEARCH_SERVICE) private readonly searchService: SearchService) { }

    public search(searchText: string, page: number) {
        // call services here
       /*  return this.searchService.searchIssues(searchText)
            .pipe(mergeMap((issues) => {
                const repos = mapIssueResponse(issues);
                repos.push(searchText);
                const uniqueRepos = new Set(repos);

                const _searchText = [...uniqueRepos].join('+');
                console.log(_searchText);
                
            })); */
        return this.searchService.searchRepositories(searchText, page)
            .pipe(map((res) => mapRepositoryResponse(res)));
    }
}

function mapIssueResponse(response: IssuesSearchResponse) {
    return response.items.map((i) => {
        return getRepoFullNameFromUrl(i.repository_url)
    });
}

function getRepoFullNameFromUrl(repoUrl: string) {
    const splitted = repoUrl.split('/');
    const owner = splitted[splitted.length - 1];
    const repo = splitted[splitted.length - 2];

    return `${owner}/${repo}`;
}

function mapRepositoryResponse(response: RepositoryResponse) {
    return response.items.map((i) => ({
        name: i.full_name,
        avatarUrl: i.owner.avatar_url,
        createdAt: i.created_at,
        language: i.language,
        stars: i.stargazers_count
    } as Repository));
}

